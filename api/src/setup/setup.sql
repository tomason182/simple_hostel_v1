
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
  first_name VARCHAR(255),
  last_name VARCHAR(255),
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
  adavance_payment_required BOOLEAN NOT NULL DEFAULT FALSE,
  deposit_amount INT,
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

-- crear tabla rates and availability
-- Crear tabla reservations

-- Crear tabla reservation_items

--crear tabla payment
-- Índice para consultar rápidamente todos los pagos de una reserva
-- Índice para cierres de caja (pagos por fecha y usuario)

-- Crear tabla reservation status.

-- Inserción de catálogo de estados
-- Crear tabla payment status.
-- Inserción de catálogo de estados

-- Crear tabla bed_occupancy.

