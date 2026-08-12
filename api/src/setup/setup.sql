
-- Crear tabla User.
CREATE TABLE IF NOT EXISTS users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  last_resend_email TIMESTAMP,
  avatar VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Properties.
CREATE TABLE IF NOT EXISTS properties (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(10) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACTIVE', 'SUSPENDED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);

-- Crear tabla Access Control.
CREATE TABLE IF NOT EXISTS access_control (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  property_id BIGINT NOT NULL,
  role VARCHAR(10) NOT NULL CHECK(role IN ('OWNER', 'ADMIN', 'MANAGER', 'EMPLOYEE')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  UNIQUE(user_id, property_id),

  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- Crear tabla addresses.
CREATE TABLE IF NOT EXISTS addresses (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_id BIGINT NOT NULL,
  house_number VARCHAR(10),
  street VARCHAR(255),
  city VARCHAR(255),
  postal_code VARCHAR(10),
  state VARCHAR(255),
  country VARCHAR(56),
  alpha_2_code VARCHAR(2),
  lat DECIMAL(9,6),
  lon DECIMAL(9,6),
  osm_id VARCHAR(20),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by BIGINT,

  UNIQUE(property_id),

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY (updated_by) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Crear tabla contact_info.
CREATE TABLE IF NOT EXISTS contact_info (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    property_id BIGINT NOT NULL UNIQUE,
    email VARCHAR(255),
    phone_calls_code VARCHAR(5),
    phone_calls VARCHAR(20),
    phone_whatsapp_code VARCHAR(5),
    phone_whatsapp VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,
    updated_by BIGINT,

    FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- Crear tabla currencies.
CREATE TABLE IF NOT EXISTS currencies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_id BIGINT NOT NULL UNIQUE,
  base_currency VARCHAR(3),
  payment_currency VARCHAR(3),

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- Crear tabla room types.
CREATE TABLE IF NOT EXISTS room_types (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_id BIGINT NOT NULL,
  description VARCHAR(255),
  type VARCHAR(10) NOT NULL,
  gender VARCHAR(10) NOT NULL CHECK(gender IN ('male', 'female', 'mixed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id),
  FOREIGN KEY(created_by) REFERENCES users(id)
);

-- Crear tabla room.
CREATE TABLE IF NOT EXISTS rooms (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  room_type_id BIGINT NOT NULL,
  name VARCHAR(100),

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  FOREIGN KEY(room_type_id) REFERENCES room_types(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);
-- Crear tabla beds.
CREATE TABLE IF NOT EXISTS beds (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  room_id BIGINT NOT NULL,
  bed_number INT NOT NULL,
  bed_type VARCHAR(10) CHECK(bed_type IN ('single', 'doble', 'bunk_bed', 'king')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  FOREIGN KEY(room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);
-- Crear tabla guests.
CREATE TABLE IF NOT EXISTS guest (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_id BIGINT NOT NULL,
  first_name VARCHAR(255) NOT NULL, 
  last_name VARCHAR(255) NOT NULL,
  id_number VARCHAR(100),
  email VARCHAR(100),
  phone_code VARCHAR(5),
  phone_number VARCHAR(30),
  street VARCHAR(100),
  city VARCHAR(100),
  country VARCHAR(100),
  alpha_2_code VARCHAR(2),

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);
-- Crear tabla breakfast_and_meals
-- Crear tabla general policies
CREATE TABLE IF NOT EXISTS general_policies (
  property_id BIGINT UNIQUE,
  min_length_stay INT,
  max_length_stay INT,
  min_advance_booking INT,
  check_in_from TIME,   -- 11:00
  check_in_until TIME,     -- 21:00
  check_out_from TIME,
  check_out_until TIME,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);
-- crear tabla payment policies
CREATE TABLE IF NOT EXISTS payment_policies (
  property_id BIGINT UNIQUE,
  advance_payment_required BOOLEAN NOT NULL DEFAULT FALSE,
  deposit_amount NUMERIC(4,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);
-- crear tabla minor policies
CREATE TABLE IF NOT EXISTS minor_policies (
  property_id BIGINT UNIQUE,
  min_check_in_age INT,
  accept_children BOOLEAN NOT NULL DEFAULT FALSE,
  minor_room_types VARCHAR(12) CHECK(minor_room_types IN ('all_rooms', 'only_private', 'only_dorms')),
  minor_adult_supervision BOOLEAN,
  min_child_age INT,
  free_stay_age INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- crear tabla other policies
CREATE TABLE IF NOT EXISTS other_policies (
  property_id BIGINT UNIQUE,
  quiet_hours_from TIME,
  quiet_hours_until TIME,
  has_smooking_areas BOOLEAN NOT NULL DEFAULT FALSE,
  allow_external_guest BOOLEAN NOT NULL DEFAULT FALSE,
  allow_pets BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- crear tabla de cancelaciones 
CREATE TABLE IF NOT EXISTS cancellationPolicies (
    property_id BIGINT UNIQUE,
    days_before_arrival INT NOT NULL CHECK(days_before_arrival > 0),
    amount_refund DECIMAL(4,2) DEFAULT 0.00,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT,

    FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- crear tabla rates and availability
CREATE TABLE IF NOT EXISTS rates_and_availability (
  property_id BIGINT, -- Aqui no se si es necesario property_id ya que se relaciona con roomType.
  room_type_id BIGINT,
  date DATE NOT NULL,
  custom_rate INT NOT NULL CHECK( custom_rate > 0),
  rooms_to_sell INT NOT NULL CHECK( rooms_to_sell >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  PRIMARY KEY(room_type_id, date),

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(room_type_id) REFERENCES room_type(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

CREATE INDEX idx_rates_property_date ON rates_and_availability(property_id, date);
CREATE INDEX idx_rates_room_type_date ON rates_and_availability(room_type_id, date);


-- Crear tabla reservations
CREATE TABLE IF NOT EXISTS reservation (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_id BIGINT NOT NULL,
  guest_id BIGINT NOT NULL,
  currency_id BIGINT NOT NULL,
  booking_source_id SMALLINT NOT NULL,
  reservation_status_id SMALLINT NOT NULL,

  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  special_request VARCHAR(500),


  -- subtotales, descuentos, impuestos, etc.
  subtotal_amount NUMERIC(12,2) NOT NULL,
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  total_amount NUMERIC(12,2) NOT NULL,   -- subtotal - discount + taxes
  required_deposit_amount NUMERIC(12,2) NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL,
  updated_at TIMESTAMPTZ,
  updated_by BIGINT,

  CHECK(check_out > check_in),
  CHECK(total_amount > 0),

  FOREIGN KEY(property_id) REFERENCES property(id) ON DELETE CASCADE,
  FOREIGN KEY(guest_id) REFERENCES guest(id),
  FOREIGN KEY(currency_id) REFERENCES currencies(id),
  FOREIGN KEY(booking_source_id) REFERENCES booking_source(id),
  FOREIGN KEY(reservation_status_id) REFERENCES reservation_status(id),
  FOREIGN KEY(created_by) REFERENCES users(id),
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- Crear tabla reservation_items
CREATE TABLE IF NOT EXISTS reservation_items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  reservation_id BIGINT NOT NULL,
  room_type_id BIGINT NOT NULL,
  
  -- Cantidad de camas o cuartos comprados de este tipo
  quantity INT NOT NULL DEFAULT 1,
  
  -- Precio acordado por unidad/noche al momento de reservar
  unit_price NUMERIC(12, 2) NOT NULL,
  subtotal NUMERIC(12, 2) NOT NULL,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- Validaciones
  CONSTRAINT chk_positive_quantity CHECK (quantity > 0),
  CONSTRAINT chk_positive_prices CHECK (unit_price >= 0 AND subtotal >= 0),

  -- FKs
  FOREIGN KEY(reservation_id) REFERENCES reservations(id) ON DELETE CASCADE,
  FOREIGN KEY(room_type_id) REFERENCES room_types(id)
);

CREATE INDEX idx_reservation_items_reservation ON reservation_items(reservation_id);


--crear tabla payment
-- Índice para consultar rápidamente todos los pagos de una reserva
-- Índice para cierres de caja (pagos por fecha y usuario)

-- Crear tabla reservation status.

-- Inserción de catálogo de estados
-- Crear tabla payment status.
-- Inserción de catálogo de estados

-- Crear tabla bed_occupancy.

