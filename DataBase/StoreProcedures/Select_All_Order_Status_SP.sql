USE [SOA_Restaurant]
GO

/****** Object:  StoredProcedure [dbo].[Select_All_Order_Status_SP]    Script Date: 25/9/2019 03:08:07 ******/
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

