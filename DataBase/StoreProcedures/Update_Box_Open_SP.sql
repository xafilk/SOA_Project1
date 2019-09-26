USE [SOA_Restaurant]
GO

/****** Object:  StoredProcedure [dbo].[Update_Box_Open_SP]    Script Date: 26/9/2019 01:29:16 ******/
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


