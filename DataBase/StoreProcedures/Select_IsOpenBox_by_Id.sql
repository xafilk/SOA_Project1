USE [SOA_Restaurant]
GO

/****** Object:  StoredProcedure [dbo].[Select_IsOpenBox_by_Id]    Script Date: 26/9/2019 01:28:25 ******/
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

