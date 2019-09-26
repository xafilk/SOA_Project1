USE [SOA_Restaurant]
GO

/****** Object:  StoredProcedure [dbo].[Update_OrderStatus_SP]    Script Date: 26/9/2019 01:29:39 ******/
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

