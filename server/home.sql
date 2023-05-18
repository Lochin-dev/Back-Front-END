CREATE DATABASE home_db;
\c home_db;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
#########################################################################
DROP TABLE IF EXISTS admin;
CREATE TABLE admin(
id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
admin_name VARCHAR UNIQUE NOT NULL,
admin_email VARCHAR(64) UNIQUE NOT NULL,
admin_password VARCHAR UNIQUE NOT NULL
);
INSERT INTO admin(admin_name, admin_email, admin_password)VALUES
('Lochin', 'lochin@gmail.com', 'lochin2212');
SELECT * FROM admin;
--  0bdcb5b7-ebc0-4dbb-be95-dfc2f5cc197a | Lochin     | lochin@gmail.com | lochin2212

###########################################################################
DROP TABLE IF EXISTS companys CASCADE;
CREATE TABLE companys(
    id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    company_title VARCHAR(50) UNIQUE NOT NULL,
    company_img VARCHAR NOT NULL
);
INSERT INTO companys(company_title)VALUES
('Golden hous'),
('Nest One'),
('Hon saroy');

SELECT * FROM companys;

SELECT complex_title FROM companys c JOIN complexs cm ON  ;
-----------------------------------------------
 UPDATE companys SET company_title = ''  WHERE id = 'ec27fd48-90ec-4b1f-aa7e-9646aa533710';
-----------------------------------------------

 DELETE FROM companys WHERE id = 'e4e6df30-fa0a-4e15-97da-24849ba294d4';

 DELETE FROM complexs WHERE id = ( SELECT cx.id FROM complexs cx JOIN companys c ON c.id = cx.company_id 
 WHERE c.id = 'e4e6df30-fa0a-4e15-97da-24849ba294d4'); 

 DELETE FROM homes WHERE id = (SELECT h.id FROM homes h JOIN complexs cx ON cx.id = h.complex_id JOIN 
 companys c ON cx.company_id = c.id WHERE c.id = 'e4e6df30-fa0a-4e15-97da-24849ba294d4');

DELETE FROM homes WHERE complex_id IN (SELECT id FROM complexs WHERE 
company_id = '8f169d4e-467a-46ea-b1b6-83d959a751a4') AND complex_id IS NOT NULL;

DELETE FROM complexs WHERE company_id = '8f169d4e-467a-46ea-b1b6-83d959a751a4' 
AND EXISTS (SELECT 1 FROM companys WHERE id = '8f169d4e-467a-46ea-b1b6-83d959a751a4');

--------------------------------------------------------------
SELECT id FROM companys WHERE company_title = 'Nest One';

 SELECT complex_title FROM complexs cx JOIN companys c ON c.id = cx.company_id WHERE 
 c.id ='';

  SELECT bank_title FROM companys c JOIN banks b ON c.id  = b.company_id WHERE c.id = 'b9397f01-7816-4bf8-90f8-92c90f8e4998';



#################################################################################

DROP TABLE IF EXISTS complexs CASCADE;
CREATE TABLE complexs(
    id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    complex_title VARCHAR(50)  NOT NULL,
    complex_adres VARCHAR(50) NOT NULL,
    company_id VARCHAR NOT NULL,
     CONSTRAINT fk_creted_bayy
     FOREIGN key(company_id)
     REFERENCES companys(id)
);


INSERT INTO complexs(complex_title, complex_adres, company_id)VALUES
('Golden','Toshkent', 'b9397f01-7816-4bf8-90f8-92c90f8e4998'),
('Nest', 'Toshkent', 'ce84ae2b-5c2d-4fa0-b2c7-f2a489dc276b'),
('Hon', 'Tashkent', '6f429c47-40fc-48d5-9c65-6f7cfaf17edf');


SELECT * FROM complexs;


 UPDATE complexs SET company_title = ''  WHERE id = '5b5a01f6-bc8d-4e21-9f2b-e39d22cb4ee6';
 
 ALTER TABLE homes DROP CONSTRAINT fk_creted_bay; 

 DELETE FROM homes WHERE complex_id = 'your_complex_id_here' AND EXISTS (SELECT 1 FROM complexs WHERE id = 'your_complex_id_here');
 DELETE FROM complexs WHERE id = '6a3c3946-9f4e-410b-8f04-e5d0e087ec5a';

SELECT id FROM complexs WHERE complex_title = 'Nest';

 SELECT h.home_num FROM  complexs c JOIN homes h ON c.id = h.complex_id WHERE 
 c.id ='2c435244-f8af-417c-aff8-9c2a210f0450';

################################################################################
DROP TABLE IF EXISTS homes CASCADE;                
CREATE TABLE homes(
          id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
          home_num INTEGER NOT NULL,
          home_price INTEGER NOT NULL,
          home_kv INTEGER NOT NULL,
          complex_id VARCHAR NOT NULL,
          CONSTRAINT fk_creted_bay
          FOREIGN key(complex_id)
          REFERENCES complexs(id)
);

INSERT INTO homes( home_num, home_price,home_kv, complex_id)VALUES
(5, 300000000, 120,  'b0894e06-3f30-4605-a3c5-c64c3b11880f'),
(2, 500000000, 60,   'd31a6211-dce3-4ceb-8afd-5013a45502cf'),
(6, 500000000, 60,   '4606c16b-1381-41da-9d69-405795182299');

SELECT * FROM homes;

 UPDATE homes SET home_num = 5  WHERE id = '04163259-ba11-4901-88a2-2d72ad598e5e';
 
 DELETE FROM homes WHERE id = '04163259-ba11-4901-88a2-2d72ad598e5e';

SELECT home_num FROM homes;

 SELECT year_num FROM  homes h JOIN years y ON h.id = y.home_id WHERE h.id ='04163259-ba11-4901-88a2-2d72ad598e5e';

##############################################################################################

DROP TABLE IF EXISTS years;
CREATE TABLE years(
          id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
          year_num INT NOT NULL,
          home_id VARCHAR NOT NULL,
          CONSTRAINT fk_creted_bay
          FOREIGN key(home_id)
          REFERENCES homes(id)
);

INSERT INTO years( year_num, home_id)VALUES
(5, 'c910895c-c34c-4017-95d0-ece3769efcb2'),
(10, 'c910895c-c34c-4017-95d0-ece3769efcb2'),
(12, 'f03be768-d63e-4f58-a736-843558dd70b2');

SELECT * FROM years;

##########################################################################################

DROP TABLE IF EXISTS banks CASCADE;
CREATE TABLE banks(
           id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
           bank_title VARCHAR NOT NULL,
           bank_price TEXT NOT NULL,
          company_id VARCHAR NOT NULL,
          CONSTRAINT fk_creted_bay
          FOREIGN key(company_id)
          REFERENCES companys(id)
);

INSERT INTO banks( bank_title, bank_price, company_id)VALUES
('Agro bamk',500000000,'b9397f01-7816-4bf8-90f8-92c90f8e4998' ),

SELECT * FROM banks;

SELECT year_num FROM banks b JOIN years y ON b.id = y.bank_id WHERE b.id = 'cc006304-e894-4dc7-8136-5b9fa1017763';



###################################################################################

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR NOT NULL,
    user_password VARCHAR NOT NULL
);

INSERT INTO users(user_name, user_email, user_password)VALUES
('Lochin','lochin@gmail.com' , 'lochin123'),
('Bilol','bilol@gmail.com' , 'bilol123'),
('Bobur','bobur@gmail.com' , 'bobur123');

SELECT * FROM users;


 ##################################################################################
DROP TABLE IF EXISTS shoppings;
CREATE TABLE shoppings(
          id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
          company_title VARCHAR NOT NULL,
          bank_name VARCHAR NOT NULL,
          complex_adres VARCHAR NOT NULL,
          user_name VARCHAR NOT NULL,
          user_tel TEXT NOT NULL
);

INSERT INTO shoppings()VALUES ()

############################################################################################
-- Bank xaqqi
 SELECT h.home_price*0.02 bank_haqi FROM years y JOIN homes h ON y.home_id = h.id WHERE y.id='76a56d18-f109-4be3-95c0-a4e45852bb44';

--  Bosh to'lovi
SELECT home_price*0.17 AS bosh_tolov FROM homes WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id 
WHERE y.id = '76a56d18-f109-4be3-95c0-a4e45852bb44');

-- Qolgani
SELECT home_price - (SELECT home_price*0.17 AS bosh_tolov FROM homes WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id 
WHERE y.id = '76a56d18-f109-4be3-95c0-a4e45852bb44'))
AS qolgani FROM homes WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id 
WHERE y.id = '76a56d18-f109-4be3-95c0-a4e45852bb44');


--  Oylik to'lovi 
 SELECT trunc((SELECT (SELECT home_price - (SELECT home_price*0.17 AS bosh_tolov FROM homes WHERE id IN (SELECT h.id FROM 
years y JOIN homes h ON y.home_id = h.id WHERE y.id = '76a56d18-f109-4be3-95c0-a4e45852bb44')) FROM homes 
WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id WHERE y.id = '76a56d18-f109-4be3-95c0-a4e45852bb44'))
 / (SELECT year_num * 12  FROM years WHERE id = '76a56d18-f109-4be3-95c0-a4e45852bb44'))::numeric, 2);

---======== UMUMIY ---------------------------
SELECT  (SELECT home_price*0.17 FROM homes WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id 
WHERE y.id = '76a56d18-f109-4be3-95c0-a4e45852bb44')) AS bosh_tolov, (SELECT home_price - (SELECT home_price*0.17 AS bosh_tolov FROM homes WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id 
WHERE y.id = '76a56d18-f109-4be3-95c0-a4e45852bb44'))
 FROM homes WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id 
WHERE y.id = '76a56d18-f109-4be3-95c0-a4e45852bb44')) AS qolgani, ( SELECT trunc((SELECT (SELECT home_price - (SELECT home_price*0.17 AS bosh_tolov FROM homes WHERE id IN (SELECT h.id FROM 
years y JOIN homes h ON y.home_id = h.id WHERE y.id = '76a56d18-f109-4be3-95c0-a4e45852bb44')) FROM homes 
WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id WHERE y.id = '76a56d18-f109-4be3-95c0-a4e45852bb44'))
 / (SELECT year_num * 12  FROM years WHERE id = '76a56d18-f109-4be3-95c0-a4e45852bb44'))::numeric, 2)) AS oylik_tolov, 
 ( SELECT h.home_price*0.02  FROM years y JOIN homes h ON y.home_id = h.id WHERE y.id='76a56d18-f109-4be3-95c0-a4e45852bb44') AS bank_haqi,
  (
SELECT y.year_num , h.home_kv, h.home_price, h.home_num, cx.complex_title, cx.complex_adres , c.company_title , b.bank_title,b.bank_price
FROM years y JOIN homes h ON y.home_id = h.id JOIN complexs cx ON h.complex_id = cx.id JOIN companys c ON 
cx.company_id = c.id JOIN banks b ON c.id = b.company_id WHERE y.id = '76a56d18-f109-4be3-95c0-a4e45852bb44');

-- --------------------------------------


SELECT b.bank_title, c.company_title, cx.complex_title, h.home_num FROM years y 
JOIN homes h ON y.home_id = h.id 
JOIN complexs cx ON h.complex_id = cx.id 
JOIN companys c ON cx.company_id = c.id 
JOIN banks b ON c.id = b.company_id 
WHERE y.id = '5c14b394-dfe6-4ad1-9fde-019082f5f42c';

-------------------------------

SELECT  max(home_num), min(home_num), sum(home_num) FROM homes;