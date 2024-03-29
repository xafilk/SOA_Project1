USE [SOA_Restaurant]
GO

/****** Object:  StoredProcedure [dbo].[Select_Orders_by_User_SP]    Script Date: 26/9/2019 01:28:44 ******/
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

