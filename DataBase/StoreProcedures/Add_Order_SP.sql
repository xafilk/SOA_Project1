USE [SOA_Restaurant]
GO

/****** Object:  StoredProcedure [dbo].[Add_Order_SP]    Script Date: 26/9/2019 01:27:44 ******/
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

