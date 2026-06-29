import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import path from "path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import mjml2html from "mjml";
import Handlebars from "handlebars";
import { convert } from "html-to-text"
import { IEmailRepositorySMTP } from "../../domain/ports/IEmailRepository";


export class EmailServiceSMTP implements IEmailRepositorySMTP {
  private transporter: Transporter;
  private templateCache = new Map<string, HandlebarsTemplateDelegate>();
  private emailConfig = {
    emailSupport: "support@simplehostel.net",
    baseURL: "simplehostel.net",

  }

  constructor(config: nodemailer.TransportOptions) {
    this.transporter = nodemailer.createTransport(config);

  }

  private async initialize(): Promise<void> {
    try {
      await this.transporter.verify();
    } catch (e) {
      throw new Error("Email Server verification failed");
    }

  }

  async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    data: object,
  ): Promise<void> {
    try {
      // 1. Seleccionar el idioma.

      // 2. Cargar la plantilla de mjml.
      let compiledTemplate = this.templateCache.get(templateName);

      if (!compiledTemplate) {
        const mjmlTemplatePath = path.join(__dirname, "./templates", `${templateName}.mjml`);
        const mjmlTemplate = await fs.readFile(mjmlTemplatePath, "utf8");

        compiledTemplate = Handlebars.compile(mjmlTemplate);
        this.templateCache.set(templateName, compiledTemplate);           // Almacenamos el template en una variable de intancia de la clase. Para ser usado en otro momento.

      }

      // 3. Compilar datos con handlebars.
      const mjmlWithData = compiledTemplate(data);

      const { html, errors } = await mjml2html(mjmlWithData, { minify: false });   // No minificamos html aqui. Vulneravilidad html-minifier. Ver si ya esta solucionado

      if (errors.length) {
        throw new Error("Error converting mjml to html")
      }

      // 4. Minificar HTML.

      // 5. configurar opciones de correo.
      const mailOptions: SendMailOptions = {
        from: `SimpleHostel <${this.emailConfig.emailSupport}>`,
        to: to,
        subject: subject,
        html: html,
        text: convert(html),
        replyTo: this.emailConfig.emailSupport,
        headers: {
          "List-Unsubscribe": `<mailto:${this.emailConfig.emailSupport}?subject=Unsubscribe>, ` + `<https://${this.emailConfig.baseURL}/unsubscribe-info>`,
          "X-Mailer": "SimpleHostel Mailer",
        },
        messageId: `<${crypto.randomUUID()}@${this.emailConfig.baseURL}>`
      };

      // 6. Enviar correo
      await this.transporter.sendMail(mailOptions);

    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Fail to send email: ${e.message}`);
      } else {
        throw new Error("Fail to send email. Unkown error");
      }
    };
  }
}
