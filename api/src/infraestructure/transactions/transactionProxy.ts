import { UnitOfWork } from "./UnitOfWork"

export function makeTransactional(service: any, unitOfWork: UnitOfWork) {
  return new Proxy(service, {
    get(target, propKeys) {
      const originalMethod = target[propKeys];
      if (typeof originalMethod !== "function") {
        return originalMethod
      }

      const needTransacion = originalMethod.useTransaction === true;

      return async function(...args: any) {
        try {
          // 1. adquirir la conexion.
          await unitOfWork.getConnection();

          // 2. Iniciar transaccion si el servicio lo requiere.
          if (needTransacion) {
            await unitOfWork.begin();
            console.log("Transaccion iniciada.")
          }

          // 3. Ejecutar el metodo original del servicio.
          const result = await originalMethod.apply(target, args);

          if (needTransacion) {
            await unitOfWork.commit();
            console.log("Transaccion finalizada.")
          }

          return result;

        } catch (err) {
          if (needTransacion) {
            await unitOfWork.rollback();
          }
          throw err;
        } finally {
          unitOfWork.release();

        }
      }


    }
  })
}
