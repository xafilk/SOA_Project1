-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Efren Carvajal
-- Create date: 2019-09-23
-- Description:	Insert New User
-- =============================================
CREATE PROCEDURE Add_NewUser_SP
	-- Add the parameters for the stored procedure here
	@name VARCHAR(50),
	@lastName1 VARCHAR(50),
	@lastName2 VARCHAR(50),
	@birthDate DATETIME, 
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
		INSERT INTO Users(Use_Name, Use_Last_Name1, Use_Last_Name2, Use_Birth_Date, Use_Email, Use_Password) VALUES(@name, @lastName1, @lastName2, @birthDate, @email, @password);
		SET @Status = 1;
	END TRY
	BEGIN CATCH
		SET @Status = -1;
	END CATCH
END
GO
