USE [SOA_Restaurant]
GO

/****** Object:  StoredProcedure [dbo].[Login_SP]    Script Date: 24/9/2019 02:10:14 ******/
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
	@password VARCHAR(256),
	@Success INT OUT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @temp VARCHAR(50)
    -- Insert statements for procedure here
	BEGIN TRY
		SELECT  @temp = U.Use_Email FROM Users as U WHERE U.Use_Email = @email AND U.Use_Password = @password
		IF(@temp IS NOT NULL)
			BEGIN
				SET @Success = 1
			END
		ELSE
			BEGIN
				SET @Success = 0
			END
	END TRY
	BEGIN CATCH
		SET @Success = 0
	END CATCH
END
GO


