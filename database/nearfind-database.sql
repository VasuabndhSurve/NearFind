IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [Categories] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Categories] PRIMARY KEY ([Id])
);

CREATE TABLE [Vendors] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NOT NULL,
    [Address] nvarchar(max) NOT NULL,
    [City] nvarchar(max) NOT NULL,
    [Phone] nvarchar(max) NOT NULL,
    [ImageUrl] nvarchar(max) NOT NULL,
    [Rating] decimal(2,1) NOT NULL,
    [ReviewCount] int NOT NULL,
    [Latitude] float NOT NULL,
    [Longitude] float NOT NULL,
    [CategoryId] int NOT NULL,
    CONSTRAINT [PK_Vendors] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Vendors_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]) ON DELETE NO ACTION
);

CREATE INDEX [IX_Vendors_CategoryId] ON [Vendors] ([CategoryId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260915140603_InitialCreate', N'10.0.12');

COMMIT;
GO

BEGIN TRANSACTION;
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Description', N'Name') AND [object_id] = OBJECT_ID(N'[Categories]'))
    SET IDENTITY_INSERT [Categories] ON;
INSERT INTO [Categories] ([Id], [Description], [Name])
VALUES (1, N'Salons, spas and personal wellness services', N'Beauty'),
(2, N'Clinics, doctors and healthcare services', N'Healthcare'),
(3, N'Gyms, yoga studios and fitness centers', N'Fitness'),
(4, N'Boutiques, clothing and fashion services', N'Fashion'),
(5, N'Restaurants, cafes and food services', N'Food');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Description', N'Name') AND [object_id] = OBJECT_ID(N'[Categories]'))
    SET IDENTITY_INSERT [Categories] OFF;

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Address', N'CategoryId', N'City', N'Description', N'ImageUrl', N'Latitude', N'Longitude', N'Name', N'Phone', N'Rating', N'ReviewCount') AND [object_id] = OBJECT_ID(N'[Vendors]'))
    SET IDENTITY_INSERT [Vendors] ON;
INSERT INTO [Vendors] ([Id], [Address], [CategoryId], [City], [Description], [ImageUrl], [Latitude], [Longitude], [Name], [Phone], [Rating], [ReviewCount])
VALUES (1, N'Andheri West', 1, N'Mumbai', N'Professional beauty and wellness services with experienced stylists.', N'', 19.136399999999998E0, 72.829599999999999E0, N'Glow Beauty Studio', N'9876543210', 4.8, 124),
(2, N'Thane West', 1, N'Thane', N'Beauty studio offering styling and personal care services.', N'', 19.218299999999999E0, 72.978099999999998E0, N'Style Studio', N'9876543211', 4.5, 87),
(3, N'Powai', 2, N'Mumbai', N'A trusted clinic providing quality healthcare and diagnostic services.', N'', 19.117599999999999E0, 72.906000000000006E0, N'MediCare Clinic', N'9876543212', 4.9, 156),
(4, N'Bandra West', 3, N'Mumbai', N'Modern fitness center offering training, yoga and wellness programs.', N'', 19.060700000000001E0, 72.836200000000005E0, N'FitZone Fitness', N'9876543213', 4.6, 98),
(5, N'Lower Parel', 4, N'Mumbai', N'Contemporary fashion and styling for everyday and special occasions.', N'', 18.998799999999999E0, 72.825800000000001E0, N'Urban Threads', N'9876543214', 4.4, 76),
(6, N'Dadar West', 5, N'Mumbai', N'A local restaurant serving authentic Indian dishes and regional flavors.', N'', 19.017800000000001E0, 72.847800000000007E0, N'Mumbai Spice', N'9876543215', 4.7, 212);
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Address', N'CategoryId', N'City', N'Description', N'ImageUrl', N'Latitude', N'Longitude', N'Name', N'Phone', N'Rating', N'ReviewCount') AND [object_id] = OBJECT_ID(N'[Vendors]'))
    SET IDENTITY_INSERT [Vendors] OFF;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260915141416_SeedInitialData', N'10.0.12');

COMMIT;
GO

