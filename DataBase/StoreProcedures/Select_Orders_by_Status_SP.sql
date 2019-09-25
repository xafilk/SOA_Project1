USE [SOA_Restaurant]
GO

/****** Object:  StoredProcedure [dbo].[Select_Orders_by_Status_SP]    Script Date: 25/9/2019 03:08:28 ******/
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
		SELECT U.Use_Name AS UserName, O.Ord_Status_Id AS StatusId, O.Ord_Id AS OrderId, O.Ord_Date AS PickUpDateTime, O.Ord_Content AS Content, O.Ord_Box_Id AS BoxId
		FROM Orders as O INNER JOIN Users AS U ON O.Ord_User_Id = U.Use_Email
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

