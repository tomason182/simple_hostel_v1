
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
-- Crear tabla contact_info.
-- Crear tabla currencies.
-- Crear tabla room types.
-- Crear tabla room_types.
-- Crear tabla beds.
-- Crear tabla guests.
-- Crear tabla breakfast_and_meals
  -- Crear tabla general policies
-- crear tabla payment policies
-- crear tabla minor policies

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

