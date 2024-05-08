-- Insert card data into SpiderCardsSchema.Cards
INSERT INTO SpiderCardsSchema.Cards (name, scientific_name, image_url, description, habitat, type_id, toxicity_rating)
VALUES 
    -- Venomous Cards
    ('Black Widow', 'Latrodectus mactans', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Black Widow spider is venomous and recognized by the distinctive red hourglass marking on the underside of its abdomen.', 
    'North America', 1, 8),
    ('Brown Recluse', 'Loxosceles reclusa', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Brown Recluse spider has a venomous bite that can cause necrotic lesions.', 
    'Midwest and Southern United States', 1, 7),
    ('Sydney Funnel-Web', 'Atrax robustus', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Sydney Funnel-Web spider is highly venomous and considered one of the worlds deadliest spiders.', 
    'Eastern Australia', 1, 9),
    ('Brazilian Wandering', 'Phoneutria', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Brazilian Wandering spider is among the worlds most venomous spiders.', 
    'Central and South America', 1, 9),
    ('Redback', 'Latrodectus hasselti', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Redback spider is closely related to the Black Widow and is highly venomous.', 
    'Australia', 1, 8),
    ('Chilean Recluse', 'Loxosceles laeta', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Chilean Recluse is venomous and can cause severe necrotic lesions.', 
    'South America', 1, 8),
    ('Six-Eyed Sand', 'Sicarius hahni', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Six-Eyed Sand spider is venomous and lives in deserts and savannas.', 
    'Southern Africa', 1, 8),
    ('Mouse', 'Missulena', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Mouse spider is highly venomous, but rarely bites humans.', 
    'Australia', 1, 7),
    ('Indian Ornamental', 'Poecilotheria regalis', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Indian Ornamental tarantula is venomous and beautifully patterned.', 
    'India', 1, 6),
    ('Goliath Birdeater', 'Theraphosa blondi', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Goliath Birdeater is the largest spider by mass and mildly venomous.', 
    'South America', 1, 5),
    ('Yellow Sac', 'Cheiracanthium inclusum', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Yellow Sac spider is venomous and known for its yellow coloring.', 
    'North America', 1, 5),
    ('Hobo', 'Eratigena agrestis', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Hobo spider is venomous but rarely causes severe reactions.', 
    'Northwestern United States', 1, 4),
    ('Mediterranean Black Widow', 'Latrodectus tredecimguttatus', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Mediterranean Black Widow spider is venomous with a distinctive red pattern.', 
    'Mediterranean Region', 1, 7),
    ('African Button', 'Latrodectus indistinctus', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The African Button spider is venomous and closely related to Black Widows.', 
    'Sub-Saharan Africa', 1, 6),
    ('Chinese Bird', 'Ornithoctonus huwena', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Chinese Bird spider is venomous and known for its large size.', 
    'China', 1, 5),
    ('Giant Huntsman', 'Heteropoda maxima', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Giant Huntsman spider is venomous and one of the largest spiders by leg span.', 
    'Laos', 1, 4),
    ('Funnel-Web', 'Hadronyche formidabilis', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Funnel-Web spider is venomous and known for its aggressive behavior.', 
    'Australia', 1, 9),
    ('Mexican Redknee', 'Brachypelma smithi', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Mexican Redknee tarantula is venomous but popular in the pet trade.', 
    'Mexico', 1, 5),
    ('Eastern Parson', 'Nephila fenestrata', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Eastern Parson spider is venomous and has striking coloration.', 
    'Eastern Africa', 1, 3),
    ('Northern Tree-Dwelling Funnel-Web', 'Hadronyche cerberea', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Northern Tree-Dwelling Funnel-Web spider is venomous and aggressive.', 
    'Australia', 1, 8),
    ('Red-Headed Mouse', 'Missulena occatoria', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Red-Headed Mouse spider is venomous and notable for its red head.', 
    'Australia', 1, 7),
    ('Antilles Pinktoe', 'Caribena versicolor', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Antilles Pinktoe tarantula is venomous and beautifully colored.', 
    'Caribbean', 1, 4),
    ('Colombian Giant', 'Megaphobema robustum', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Colombian Giant tarantula is venomous and known for its defensive behavior.', 
    'Colombia', 1, 6),
    ('Peacock Tarantula', 'Poecilotheria metallica', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Peacock Tarantula is venomous and known for its striking coloration.', 
    'India', 1, 5),
    ('Brazilian Giant Tawny Red', 'Grammostola iheringi', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Brazilian Giant Tawny Red tarantula is venomous but often kept as a pet.', 
    'Brazil', 1, 4),
    ('King Baboon', 'Pelinobius muticus', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The King Baboon tarantula is venomous and known for its defensive nature.', 
    'Eastern Africa', 1, 6),
    ('Indian Violet', 'Chilobrachys fimbriatus', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Indian Violet tarantula is venomous and known for its speed.', 
    'India', 1, 4),
    ('Salmon Pink Birdeater', 'Lasiodora parahybana', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Salmon Pink Birdeater tarantula is venomous and one of the largest species.', 
    'Brazil', 1, 4),
    ('Chinese Hourglass', 'Cyrtophora citricola', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Chinese Hourglass spider is venomous and recognized by its unique web.', 
    'China', 1, 5),
    ('Giant White Knee', 'Acanthoscurria geniculata', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Giant White Knee tarantula is venomous and known for its distinctive white stripes.', 
    'Brazil', 1, 5),
    ('Purple Earth Tiger', 'Chilobrachys andersoni', 'https://hips.hearstapps.com/hmg-prod/images/wolf-spider-royalty-free-image-1568319878.jpg?crop=0.669xw:1.00xh;0.211xw,0&resize=980:*', 
    'The Purple Earth Tiger tarantula is venomous and known for its purple coloring.', 
    'Myanmar', 1, 4),

    -- Non-Venomous Cards
    ('Garden Orb-Weaver', 'Araneus diadematus', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Garden Orb-Weaver is harmless and recognized by its beautiful web designs.', 
    'Temperate regions worldwide', 2, 1),
    ('Jumping Spider', 'Salticidae', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'Jumping spiders are known for their excellent vision and jumping ability.', 
    'Worldwide', 2, 1),
    ('Daddy Long-Legs', 'Pholcidae', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'Daddy Long-Legs spiders are harmless to humans and often found in homes.', 
    'Worldwide', 2, 1),
    ('Golden Silk Orb-Weaver', 'Nephila clavipes', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Golden Silk Orb-Weaver creates golden-colored silk and is harmless to humans.', 
    'North and South America', 2, 1),
    ('Spiny Orb-Weaver', 'Gasteracantha cancriformis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Spiny Orb-Weaver is harmless and known for its colorful, spiny abdomen.', 
    'Southeastern United States', 2, 1),
    ('Magnolia Green Jumper', 'Lyssomanes viridis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Magnolia Green Jumper is harmless and known for its bright green color.', 
    'Southeastern United States', 2, 1),
    ('Barn Orb-Weaver', 'Araneus cavaticus', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Barn Orb-Weaver is harmless and often found in barns and sheds.', 
    'North America', 2, 1),
    ('Striped Lynx', 'Oxyopes salticus', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Striped Lynx spider is harmless and often found in gardens.', 
    'North America', 2, 1),
    ('Common House Spider', 'Parasteatoda tepidariorum', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Common House Spider is harmless and often found in homes.', 
    'Worldwide', 2, 1),
    ('Flower Crab', 'Misumena vatia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Flower Crab spider is harmless and known for its ability to change colors.', 
    'North America', 2, 1),
    ('Dotted Wolf', 'Pardosa milvina', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Dotted Wolf spider is harmless and known for its dotted pattern.', 
    'North America', 2, 1),
    ('Brown Huntsman', 'Heteropoda venatoria', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Brown Huntsman spider is harmless and often found in homes.', 
    'Worldwide', 2, 1),
    ('Spinybacked Orb-Weaver', 'Gasteracantha', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Spinybacked Orb-Weaver is harmless and recognized by its spiny appearance.', 
    'Worldwide', 2, 1),
    ('Crab', 'Thomisidae', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Crab spider is harmless and known for its crab-like appearance.', 
    'Worldwide', 2, 1),
    ('Mouse', 'Scytodes', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Mouse spider is harmless and known for its gentle nature.', 
    'Worldwide', 2, 1),
    ('Curved-Spined', 'Tetragnatha', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Curved-Spined spider is harmless and often found near water.', 
    'Worldwide', 2, 1),
    ('Long-Jawed Orb-Weaver', 'Tetragnathidae', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Long-Jawed Orb-Weaver spider is harmless and has long, thin jaws.', 
    'Worldwide', 2, 1),
    ('Furrow Orb-Weaver', 'Larinioides cornutus', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Furrow Orb-Weaver is harmless and known for its furrow-like pattern.', 
    'Worldwide', 2, 1),
    ('Giant House', 'Eratigena atrica', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Giant House spider is harmless and often found in homes.', 
    'Worldwide', 2, 1),
    ('Green Lynx', 'Peucetia viridans', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Green Lynx spider is harmless and known for its green coloring.', 
    'Southern United States', 2, 1),
    ('Comb-Footed', 'Theridiidae', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Comb-Footed spider is harmless and often found in homes.', 
    'Worldwide', 2, 1),
    ('Feather-Legged', 'Uloborus', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Feather-Legged spider is harmless and known for its feather-like appearance.', 
    'Worldwide', 2, 1),
    ('Black-and-Yellow Garden', 'Argiope aurantia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Black-and-Yellow Garden spider is harmless and known for its distinctive coloring.', 
    'North America', 2, 1),
    ('Magnolia Green', 'Peucetia longipalpis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Magnolia Green spider is harmless and known for its bright green color.', 
    'Southeastern United States', 2, 1),
    ('Candy Stripe', 'Enoplognatha ovata', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Candy Stripe spider is harmless and known for its colorful stripes.', 
    'North America', 2, 1),
    ('Dewdrop', 'Argyrodes', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Dewdrop spider is harmless and known for its small, dew-like appearance.', 
    'Worldwide', 2, 1),
    ('Pink Toe', 'Avicularia avicularia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Pink Toe tarantula is harmless and known for its pink-tipped toes.', 
    'South America', 2, 1),
    ('Chaco Golden Knee', 'Grammostola pulchripes', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Chaco Golden Knee tarantula is harmless and often kept as a pet.', 
    'South America', 2, 1),
    ('Striped Knee', 'Aphonopelma seemanni', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Striped Knee tarantula is harmless and often kept as a pet.', 
    'Central America', 2, 1),
    ('Texas Brown', 'Aphonopelma hentzi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Texas Brown tarantula is harmless and often found in Texas.', 
    'United States', 2, 1),
    ('Pink Zebra Beauty', 'Eupalaestrus campestratus', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Pink Zebra Beauty tarantula is harmless and known for its distinctive pattern.', 
    'South America', 2, 1),
    ('Brazilian Black', 'Grammostola pulchra', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZAo3WOip_04gw2KMx5ojo8TnWvxxk4i_3b9HyHl1MQ&s', 
    'The Brazilian Black tarantula is harmless and often kept as a pet.', 
    'Brazil', 2, 1);
GO
