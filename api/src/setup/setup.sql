
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Properties.
CREATE TABLE IF NOT EXISTS properties (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(10) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACTIVE', 'SUSPENDED')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Access Control.
CREATE TABLE IF NOT EXISTS access_control (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  property_id BIGINT NOT NULL,
  role VARCHAR(10) NOT NULL CHECK(role IN ('OWNER', 'ADMIN', 'MANAGER', 'EMPLOYEE')),

  UNIQUE(user_id, property_id)

  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
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
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
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

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- Crear tabla room types.
CREATE TABLE IF NOT EXISTS room_types (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_id BIGINT NOT NULL,
  description VARCHAR(100),
  gender VARCHAR(10) NOT NULL CHECK(gender IN ('male', 'female', 'mixed')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- Crear tabla room_types.
CREATE TABLE IF NOT EXISTS rooms (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  room_type_id BIGINT NOT NULL,
  name VARCHAR(100),

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
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

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
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

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- Crear tabla breakfast_and_meals
CREATE TABLE IF NOT EXISTS breakfast_and_meals (
  property_id BIGINT UNIQUE,
  is_included BOOLEAN NOT NULL DEFAULT FALSE,
  is_serve BOOLEAN NOT NULL DEFAULT FALSE,
  price INT,
  from VARCHAR(5),  -- 09:00
  to VARCHAR(5),    -- 11:00
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- Crear tabla general policies
CREATE TABLE IF NOT EXISTS general_policies (
  property_id BIGINT UNIQUE,
  min_length_stay INT,
  max_length_stay INT,
  min_advance_booking INT,
  check_in_from VARCHAR(5),   -- 11:00
  check_in_until VARCHAR(5),     -- 21:00
  check_out_from VARCHAR(5),
  check_out_until VARCHAR(5)
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- crear tabla payment policies
CREATE TABLE IF NOT EXISTS payment_policies (
  property_id BIGINT UNIQUE,
  adavance_payment_required BOOLEAN NOT NULL DEFAULT FALSE,
  deposit_amount INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- crear tabla minor policies
CREATE TABLE IF NOT EXISTS minor_policies (
  property_id BIGINT UNIQUE,
  min_check_in_age INT,
  accept_children BOOLEAN NOT NULL DEFAULT FALSE,
  minor_adult_supervision BOOLEAN,
  min_child_age INT,
  free_stay_age INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);
-- crear tabla other policies
CREATE TABLE IF NOT EXISTS other_policies (
  property_id BIGINT UNIQUE,
  quiet_hours_from VARCHAR(5),
  quiet_hours_until VARCHAR(5),
  has_smooking_areas BOOLEAN NOT NULL DEFAULT FALSE,
  allow_external_guest BOOLEAN NOT NULL DEFAULT FALSE,
  allow_pets BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  updated_by BIGINT,

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);
-- crear tabla rates and availability
CREATE TABLE IF NOT EXISTS rates_and_availability (
  property_id BIGINT, -- Aqui no se si es necesario property_id ya que se relaciona con roomType.
  room_type_id BIGINT,
  date DATE NOT NULL,
  custum_rate INT NOT NULL CHECK( custum_rate > 0),
  rooms_to_sell INT NOT NULL CHECK( rooms_to_sell >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  updated_by BIGINT,

  UNIQUE(property_id, room_type_id),

  FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY(updated_by) REFERENCES users(id)
);

-- Crear tabla reservations
CREATE TABLE IF NOT EXISTS reservations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_id BIGINT NOT NULL,
  guest_id BIGINT NOT NULL,
  booking_source VARCHAR(20) NOT NULL,
  reservation_status VARCHAR(10) CHECK(reservation_status IN ('confirmed', 'canceled', 'pending')),
  currency VARCHAR(3) NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  special_request VARCHAR(500),
  total_amount INT NOT NULL,
  advance_payment_amount INT NOT NULL,
  
  FOREIGN KEY(property_id) REFERENCES property(id) ON DELETE CASCADE,
  FOREIGN KEY(guest_id) REFERENCES guest(id)
);


-- Crear tabla bed_occupancy.
CREATE TABLE IF NOT EXISTS bed_occupancy (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  bed_id BIGINT NOT NULL,
  reservation_id BIGINT NOT NULL,
  room_type_id BIGINT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,

  UNIQUE (bed_id, reservation_id),
  CHECK (check_in < check_out),

  FOREIGN KEY(bed_id) REFERENCES beds(id),
  FOREIGN KEY(reservation_id) REFERENCES reservations(id),
  FOREIGN KEY(room_type_id) REFERENCES room_types(id),

);

CREATE INDEX idx_bed_occupancy_room_type_dates ON bed_occupancy(room_type_id, check_in, check_out);

CREATE INDEX idx_bed_occupancy_bed_dates ON bed_occupancy(bed_id, check_in, check_out);
