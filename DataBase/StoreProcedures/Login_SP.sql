USE [SOA_Restaurant]
GO

/****** Object:  StoredProcedure [dbo].[Login_SP]    Script Date: 26/9/2019 01:27:59 ******/
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

