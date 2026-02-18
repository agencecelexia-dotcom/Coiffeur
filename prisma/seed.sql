-- Salon Info
INSERT OR IGNORE INTO SalonInfo (id, name, address, city, postalCode, phone, email, openingTime, closingTime, closedDays)
VALUES ('singleton', 'Salon Élégance', '12 Rue de la Beauté', 'Paris', '75008', '01 23 45 67 89', 'contact@salon-elegance.fr', '09:00', '19:00', '0');

-- Service Categories
INSERT OR IGNORE INTO ServiceCategory (id, name, "order") VALUES
  ('cat-coupes', 'Coupes', 1),
  ('cat-coloration', 'Coloration', 2),
  ('cat-soins', 'Soins', 3),
  ('cat-barbe', 'Barbe & Homme', 4);

-- Services
INSERT OR IGNORE INTO Service (id, name, description, duration, price, categoryId, active) VALUES
  ('svc-01', 'Coupe Femme', 'Coupe, shampoing et brushing', 60, 45, 'cat-coupes', 1),
  ('svc-02', 'Coupe Homme', 'Coupe classique homme', 30, 25, 'cat-coupes', 1),
  ('svc-03', 'Coupe Enfant', 'Coupe enfant (moins de 12 ans)', 25, 18, 'cat-coupes', 1),
  ('svc-04', 'Brushing', 'Brushing simple', 30, 25, 'cat-coupes', 1),
  ('svc-05', 'Coloration complète', 'Coloration racines et longueurs', 90, 65, 'cat-coloration', 1),
  ('svc-06', 'Balayage', 'Balayage naturel ou contrasté', 120, 85, 'cat-coloration', 1),
  ('svc-07', 'Mèches', 'Mèches partielles ou complètes', 90, 70, 'cat-coloration', 1),
  ('svc-08', 'Soin profond', 'Soin nourrissant et réparateur', 30, 30, 'cat-soins', 1),
  ('svc-09', 'Soin Kératine', 'Lissage brésilien à la kératine', 120, 150, 'cat-soins', 1),
  ('svc-10', 'Taille de barbe', 'Taille et entretien de barbe', 20, 15, 'cat-barbe', 1),
  ('svc-11', 'Rasage traditionnel', 'Rasage au coupe-chou', 30, 25, 'cat-barbe', 1);

-- Staff Members
INSERT OR IGNORE INTO StaffMember (id, firstName, lastName, bio, specialties, photoUrl, active) VALUES
  ('staff-sophie', 'Sophie', 'Martin', 'Spécialiste coloration et balayage depuis 15 ans. Formée aux dernières techniques de mèches et de tie & dye.', 'Coloration,Balayage,Coupe Femme', '', 1),
  ('staff-lucas', 'Lucas', 'Bernard', 'Expert en coupe homme et barbe. Passionné par les coupes tendance et le rasage traditionnel.', 'Coupe Homme,Barbe,Rasage', '', 1),
  ('staff-emma', 'Emma', 'Dubois', 'Spécialiste des soins capillaires et du lissage. Diplômée en trichologie.', 'Soins,Kératine,Coupe Femme', '', 1);

-- Staff Schedules (Mon-Sat working, Sunday off)
-- Sophie
INSERT OR IGNORE INTO StaffSchedule (id, staffId, dayOfWeek, startTime, endTime, isOff) VALUES
  ('sch-sophie-0', 'staff-sophie', 0, '09:00', '19:00', 1),
  ('sch-sophie-1', 'staff-sophie', 1, '09:00', '19:00', 0),
  ('sch-sophie-2', 'staff-sophie', 2, '09:00', '19:00', 0),
  ('sch-sophie-3', 'staff-sophie', 3, '09:00', '19:00', 0),
  ('sch-sophie-4', 'staff-sophie', 4, '09:00', '19:00', 0),
  ('sch-sophie-5', 'staff-sophie', 5, '09:00', '19:00', 0),
  ('sch-sophie-6', 'staff-sophie', 6, '09:00', '19:00', 0);

-- Lucas
INSERT OR IGNORE INTO StaffSchedule (id, staffId, dayOfWeek, startTime, endTime, isOff) VALUES
  ('sch-lucas-0', 'staff-lucas', 0, '09:00', '19:00', 1),
  ('sch-lucas-1', 'staff-lucas', 1, '09:00', '19:00', 0),
  ('sch-lucas-2', 'staff-lucas', 2, '09:00', '19:00', 0),
  ('sch-lucas-3', 'staff-lucas', 3, '09:00', '19:00', 0),
  ('sch-lucas-4', 'staff-lucas', 4, '09:00', '19:00', 0),
  ('sch-lucas-5', 'staff-lucas', 5, '09:00', '19:00', 0),
  ('sch-lucas-6', 'staff-lucas', 6, '09:00', '19:00', 0);

-- Emma
INSERT OR IGNORE INTO StaffSchedule (id, staffId, dayOfWeek, startTime, endTime, isOff) VALUES
  ('sch-emma-0', 'staff-emma', 0, '09:00', '19:00', 1),
  ('sch-emma-1', 'staff-emma', 1, '09:00', '19:00', 0),
  ('sch-emma-2', 'staff-emma', 2, '09:00', '19:00', 0),
  ('sch-emma-3', 'staff-emma', 3, '09:00', '19:00', 0),
  ('sch-emma-4', 'staff-emma', 4, '09:00', '19:00', 0),
  ('sch-emma-5', 'staff-emma', 5, '09:00', '19:00', 0),
  ('sch-emma-6', 'staff-emma', 6, '09:00', '19:00', 0);
