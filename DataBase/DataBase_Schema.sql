USE[SOA_Restaurant]

/* Table definition*/

/* Users Information*/
CREATE TABLE Users (
	Use_Name VARCHAR(50) NOT NULL,
	Use_Last_Name1 VARCHAR(50) NOT NULL,
	Use_Last_Name2 VARCHAR(50) NULL,
	Use_Birth_Date DATETIME NULL,
	Use_Email VARCHAR(100) NOT NULL,
	Use_Password VARCHAR(256) NOT NULL,
);

/* Orders Information*/
CREATE TABLE Orders (
	Ord_Id INT IDENTITY(1,1) NOT NULL,
	Ord_Date DATETIME NOT NULL, 
	Ord_Status_Id INT NOT NULL,
	Ord_Content VARCHAR(MAX) NOT NULL,
	Ord_User_Id VARCHAR(100) NOT NULL,
	Ord_Box_Id VARCHAR(50) NULL
);

/* Boxes Information*/
CREATE TABLE Boxes (
	Box_Id VARCHAR(50) NOT NULL,
	Box_Status INT NOT NULL,
	Box_Description VARCHAR(100) NULL,
	Box_Open BIT NOT NULL
);

/* Order Status (Catalog)*/
CREATE TABLE Order_Status (
	Ords_Id INT NOT NULL,
	Ords_Description VARCHAR(100) NOT NULL,
);

CREATE TABLE Box_Status (
	Boxs_Id INT NOT NULL,
	Boxs_Description VARCHAR(100) NOT NULL
);

/* Constraints Definition*/

ALTER TABLE Users
ADD CONSTRAINT PK_Users PRIMARY KEY(Use_Email)

ALTER TABLE Boxes
ADD CONSTRAINT PK_Boxes PRIMARY KEY(Box_Id);

ALTER TABLE Order_Status
ADD CONSTRAINT PK_OrderStatus PRIMARY KEY(Ords_Id);

ALTER TABLE Box_Status
ADD CONSTRAINT PK_BoxStatus PRIMARY KEY(Boxs_Id);

ALTER TABLE Orders
ADD CONSTRAINT PK_Orders PRIMARY KEY(Ord_Id);
ALTER TABLE Orders
ADD CONSTRAINT FK_Orders_Users FOREIGN KEY (Ord_User_Id) REFERENCES Users(Use_Email);
ALTER TABLE Orders
ADD CONSTRAINT FK_Orders_Boxes FOREIGN KEY (Ord_Box_Id) REFERENCES Boxes(Box_Id);
ALTER TABLE Orders
ADD CONSTRAINT FK_Orders_OrderStatus FOREIGN KEY (Ord_Status_Id) REFERENCES Order_Status(Ords_Id);

