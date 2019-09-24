USE [SOA_Restaurant]

INSERT INTO Box_Status (Boxs_Id, Boxs_Description) VALUES(1, 'Free'); 
INSERT INTO Box_Status (Boxs_Id, Boxs_Description) VALUES(2, 'Bussy'); 
INSERT INTO Box_Status (Boxs_Id, Boxs_Description) VALUES(3, 'Dirty'); 
INSERT INTO Box_Status (Boxs_Id, Boxs_Description) VALUES(4, 'Reparation'); 

INSERT INTO Boxes (Box_Id, Box_Status, Box_Description) VALUES('A2D2', 1, 'Little Size Orders');
INSERT INTO Boxes (Box_Id, Box_Status, Box_Description) VALUES('MagicBox', 1, 'Big Size Orders');

INSERT INTO Order_Status (Ords_Id, Ords_Description) VALUES(1, 'Ordered');
INSERT INTO Order_Status (Ords_Id, Ords_Description) VALUES(2, 'In Progress');
INSERT INTO Order_Status (Ords_Id, Ords_Description) VALUES(3, 'Ready');
INSERT INTO Order_Status (Ords_Id, Ords_Description) VALUES(4, 'Delivered');
