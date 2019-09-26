USE [SOA_Restaurant]
GO
/****** Object:  StoredProcedure [dbo].[Add_NewUser_SP]    Script Date: 26/9/2019 01:26:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Efren Carvajal
-- Create date: 2019-09-23
-- Description:	Insert New User
-- =============================================
CREATE PROCEDURE [dbo].[Add_NewUser_SP]
	-- Add the parameters for the stored procedure here
	@name VARCHAR(50),
	@lastName1 VARCHAR(50),
	@lastName2 VARCHAR(50),
	@email VARCHAR(100),
	@password VARCHAR(256),
	@Status int OUTPUT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	BEGIN TRY
		INSERT INTO Users(Use_Name, Use_Last_Name1, Use_Last_Name2, Use_Email, Use_Password) VALUES(@name, @lastName1, @lastName2, @email, @password);
		SET @Status = 1;
	END TRY
	BEGIN CATCH
		SET @Status = -1;
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[Add_Order_SP]    Script Date: 26/9/2019 01:26:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Efren Carvajal 
-- Create date: 2019-09-24
-- Description:	Add New order
-- =============================================
CREATE PROCEDURE [dbo].[Add_Order_SP]
	-- Add the parameters for the stored procedure here
	@date DATETIME,
	@content VARCHAR(max),
	@userEmail VARCHAR(50),
	@boxId VARCHAR(50),
	@Success INT OUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	BEGIN TRY
		INSERT INTO Orders (Ord_Date, Ord_Status_Id, Ord_Content, Ord_User_Id, Ord_Box_Id) VALUES(@date, 1, @content, @userEmail, @boxId)
		SET @Success = 1;
	END TRY
	BEGIN CATCH
		SET @Success = 0;
	END CATCH

END
GO
/****** Object:  StoredProcedure [dbo].[Login_SP]    Script Date: 26/9/2019 01:26:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Efren Carvajal
-- Create date: 2019-09-24
-- Description:	Validate Login
-- =============================================
CREATE PROCEDURE [dbo].[Login_SP]
	-- Add the parameters for the stored procedure here
	@email VARCHAR(50),
	@Password VARCHAR(256) OUT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @temp VARCHAR(50)
    -- Insert statements for procedure here
	BEGIN TRY
		SELECT @Password = U.Use_Password FROM Users as U WHERE U.Use_Email = @email
		IF(@Password IS NULL)
			BEGIN
				SET @Password = 'Error'
			END
	END TRY
	BEGIN CATCH
		SET @Password = 'Error'
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[Select_All_Order_Status_SP]    Script Date: 26/9/2019 01:26:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Efren Carvajal
-- Create date: 2019-09-24
-- Description:	Select All Order Status
-- =============================================
CREATE PROCEDURE [dbo].[Select_All_Order_Status_SP]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT Ords_Id, Ords_Description FROM Order_Status

END
GO
/****** Object:  StoredProcedure [dbo].[Select_IsOpenBox_by_Id]    Script Date: 26/9/2019 01:26:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Efren Carvajal
-- Create date: 2019-09-25
-- Description:	Validate is the Box is set to Open
-- =============================================
CREATE PROCEDURE [dbo].[Select_IsOpenBox_by_Id]
	-- Add the parameters for the stored procedure here
	@boxId VARCHAR(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @temp INT
    -- Insert statements for procedure here
	BEGIN TRY
		SELECT @temp = Box_Open FROM Boxes WHERE Box_Id = @boxId
	END TRY
	BEGIN CATCH
		SET @temp = 0
	END CATCH
	RETURN @temp
END
GO
/****** Object:  StoredProcedure [dbo].[Select_Orders_by_Status_SP]    Script Date: 26/9/2019 01:26:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Efren Carvajal
-- Create date: 2019-09-24
-- Description:	Get All Orders by Status
-- =============================================
CREATE PROCEDURE [dbo].[Select_Orders_by_Status_SP]
	-- Add the parameters for the stored procedure here
	@statusId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @temp INT
    -- Insert statements for procedure here
	BEGIN TRY
		SELECT U.Use_Name AS UserName, O.Ord_Id AS OrderId,  O.Ord_Status_Id AS StatusId,  
			(CASE WHEN OS.Ords_Description = 'Ordered' THEN REPLACE(Os.Ords_Description, 'Ordered', 'Ordenado')
				WHEN OS.Ords_Description = 'In Progress' THEN REPLACE(Os.Ords_Description, 'In Progress', 'En Progreso')
				WHEN OS.Ords_Description = 'Ready' THEN REPLACE(Os.Ords_Description, 'Ready', 'Listo')
				WHEN OS.Ords_Description = 'Delivered' THEN REPLACE(Os.Ords_Description, 'Delivered', 'Entregado')
			END) AS StatusDescription,
			O.Ord_Date AS PickUpDateTime, O.Ord_Content AS Content, O.Ord_Box_Id AS BoxId
		FROM Orders as O INNER JOIN Users AS U ON O.Ord_User_Id = U.Use_Email INNER JOIN Order_Status AS OS ON O.Ord_Status_Id = OS.Ords_Id
		WHERE O.Ord_Status_Id = @statusId
		ORDER BY O.Ord_Date DESC

		SET @temp = 1
	END TRY
	BEGIN CATCH
		SET @temp = 0
	END CATCH

	RETURN @temp
END
GO
/****** Object:  StoredProcedure [dbo].[Select_Orders_by_User_SP]    Script Date: 26/9/2019 01:26:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Efren Carvajal
-- Create date: 2019-09-24
-- Description:	Get All Orders by User
-- =============================================
CREATE PROCEDURE [dbo].[Select_Orders_by_User_SP]
	-- Add the parameters for the stored procedure here
	@userId VARCHAR(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @temp INT
    -- Insert statements for procedure here
	BEGIN TRY
		SELECT U.Use_Name AS UserName, O.Ord_Id AS OrderId,  O.Ord_Status_Id AS StatusId, (CASE WHEN OS.Ords_Description = 'Ordered' THEN REPLACE(Os.Ords_Description, 'Ordered', 'Ordenado')
				WHEN OS.Ords_Description = 'In Progress' THEN REPLACE(Os.Ords_Description, 'In Progress', 'En Progreso')
				WHEN OS.Ords_Description = 'Ready' THEN REPLACE(Os.Ords_Description, 'Ready', 'Listo')
				WHEN OS.Ords_Description = 'Delivered' THEN REPLACE(Os.Ords_Description, 'Delivered', 'Entregado')
			END) AS StatusDescription,
			O.Ord_Date AS PickUpDateTime, O.Ord_Content AS Content, O.Ord_Box_Id AS BoxId
		FROM Orders as O INNER JOIN Users AS U ON O.Ord_User_Id = U.Use_Email INNER JOIN Order_Status AS OS ON O.Ord_Status_Id = OS.Ords_Id
		WHERE U.Use_Email = @userId
		ORDER BY O.Ord_Date DESC

		SET @temp = 1
	END TRY
	BEGIN CATCH
		SET @temp = 0
	END CATCH

	RETURN @temp
END
GO
/****** Object:  StoredProcedure [dbo].[Update_Box_Open_SP]    Script Date: 26/9/2019 01:26:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Efren Carvajal
-- Create date: 2019-09-25
-- Description:	Update Box Open Status
-- =============================================
CREATE PROCEDURE [dbo].[Update_Box_Open_SP]
	-- Add the parameters for the stored procedure here
	@boxId VARCHAR(52),
	@status BIT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @temp INT
    -- Insert statements for procedure here
	BEGIN TRY
		UPDATE Boxes SET Box_Open = @status WHERE Box_Id = @boxId
		SELECT @temp = ROWCOUNT_BIG()
	END TRY
	BEGIN CATCH
		Throw;
	END CATCH

	RETURN @temp
END
GO
/****** Object:  StoredProcedure [dbo].[Update_OrderStatus_SP]    Script Date: 26/9/2019 01:26:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Efren Carvajal Valverde
-- Create date: 2019-09-25
-- Description:	Update Order Status
-- =============================================
CREATE PROCEDURE [dbo].[Update_OrderStatus_SP] 
	-- Add the parameters for the stored procedure here
	@orderId INT,
	@statusId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @temp INT
    -- Insert statements for procedure here
	BEGIN TRY
		UPDATE Orders SET Ord_Status_Id = @statusId
		WHERE Ord_Id = @orderId
		SET @temp = 1
	END TRY
	BEGIN CATCH
		SET @temp = 0
	END CATCH
	RETURN @temp
END
GO
