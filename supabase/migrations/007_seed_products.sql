insert into public.products
  (name, description, price, original_price, category, image_url, images,
   rating, review_count, is_bestseller, is_prime, is_deal, deal_end_at, brand, tags)
values

-- ELECTRONICS (6)
(
  'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
  'Industry-leading noise canceling headphones with 30-hour battery life. Multipoint connection lets you pair to two devices. Crystal-clear call quality. Ultra-lightweight at 250g for all-day comfort.',
  279.99, 349.99, 'Electronics',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
  ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800'],
  4.7, 18423, true, true, true,
  now() + interval '2 days 14 hours', 'Sony',
  ARRAY['headphones', 'wireless', 'noise-canceling', 'audio']
),
(
  'Apple iPad Air 10.9-inch (5th Generation) Wi-Fi 256GB',
  'Supercharged by the M1 chip. Stunning 10.9-inch Liquid Retina display with True Tone. USB-C connectivity. Touch ID for secure authentication. Up to 10 hours of battery life.',
  599.00, 749.00, 'Electronics',
  'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600',
  ARRAY['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800'],
  4.8, 9841, true, true, false,
  null, 'Apple',
  ARRAY['tablet', 'ipad', 'apple', 'productivity']
),
(
  'Anker USB-C Hub 7-in-1 Multiport Adapter',
  'Expands your USB-C laptop with 4K HDMI, 3 USB-A 3.0 ports, SD and microSD card readers, and 100W Power Delivery passthrough. Plug-and-play, no driver needed.',
  35.99, 45.99, 'Electronics',
  'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600',
  ARRAY['https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800'],
  4.5, 31207, true, true, false,
  null, 'Anker',
  ARRAY['usb-hub', 'adapter', 'hdmi', 'accessories']
),
(
  'Logitech MX Master 3S Wireless Performance Mouse',
  'Ultra-fast MagSpeed electromagnetic scrolling. 8,000 DPI Darkfield sensor works on any surface including glass. Quiet clicks. Charge via USB-C. Up to 70 days on a full charge.',
  89.99, 99.99, 'Electronics',
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600',
  ARRAY['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'],
  4.7, 14560, false, true, false,
  null, 'Logitech',
  ARRAY['mouse', 'wireless', 'productivity', 'office']
),
(
  'Samsung 65-Inch Class QLED 4K Smart TV',
  'Quantum HDR with Quantum Dot color technology. Object Tracking Sound matches audio to on-screen action. Motion Xcelerator for smoother action scenes. Alexa and Google Assistant built in.',
  897.99, 1299.99, 'Electronics',
  'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600',
  ARRAY['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800'],
  4.6, 6234, false, true, true,
  now() + interval '1 day 6 hours', 'Samsung',
  ARRAY['tv', '4k', 'smart-tv', 'qled', 'samsung']
),
(
  'Kindle Paperwhite 16GB — Adjustable Warm Light, USB-C',
  'The thinnest and lightest Paperwhite ever. 300 ppi glare-free display with adjustable warm light. 10 weeks of battery life. Now with USB-C charging. Waterproof rating IPX8.',
  149.99, 159.99, 'Electronics',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
  ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'],
  4.6, 27891, true, true, false,
  null, 'Kindle',
  ARRAY['kindle', 'ebook', 'reading', 'e-reader']
),

-- HOME & KITCHEN (5)
(
  'Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart',
  'Replaces 7 kitchen appliances in one. Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer. 15 smart programs for one-touch convenience.',
  79.99, 99.95, 'Home & Kitchen',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
  ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'],
  4.7, 119483, true, true, false,
  null, 'Instant Pot',
  ARRAY['pressure-cooker', 'kitchen', 'cooking', 'appliance']
),
(
  'Cuisinart Grind & Brew 12-Cup Automatic Coffeemaker',
  'Built-in conical burr grinder grinds fresh beans directly into the filter before each brew. Fully automatic with adjustable grind size, brew strength, and programmable 24-hour timer.',
  149.95, 199.95, 'Home & Kitchen',
  'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600',
  ARRAY['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800'],
  4.4, 8761, false, true, false,
  null, 'Cuisinart',
  ARRAY['coffee', 'coffeemaker', 'grinder', 'kitchen']
),
(
  'Lodge 12-Inch Cast Iron Skillet, Pre-Seasoned',
  'Pre-seasoned with natural vegetable oil. Superior heat retention and even distribution. Safe for all cooking surfaces including induction, oven, campfire, and grill. Lasts generations.',
  34.90, null, 'Home & Kitchen',
  'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600',
  ARRAY['https://images.unsplash.com/photo-1585515320310-259814833e62?w=800'],
  4.8, 45234, true, false, false,
  null, 'Lodge',
  ARRAY['cast-iron', 'skillet', 'cookware', 'kitchen']
),
(
  'Dyson V15 Detect Absolute Cordless Vacuum',
  'Laser reveals microscopic dust invisible to the naked eye. HEPA filtration captures 99.99% of particles as small as 0.3 microns. Powerful digital motor adapts suction to floor type automatically.',
  649.99, 749.99, 'Home & Kitchen',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
  ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
  4.6, 12038, false, true, false,
  null, 'Dyson',
  ARRAY['vacuum', 'cordless', 'dyson', 'cleaning']
),
(
  '500-Thread-Count 100% Cotton Sheet Set, Queen — Bright White',
  'Luxuriously soft sateen weave with a subtle sheen. Double-stitched hems for durability. Deep 18-inch pockets fit thick mattresses. Machine washable — gets softer with every wash.',
  49.99, 79.99, 'Home & Kitchen',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
  ARRAY['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
  4.5, 23157, true, true, true,
  now() + interval '3 days 2 hours', 'ShopNova Basics',
  ARRAY['sheets', 'bedding', 'cotton', 'queen', 'bedroom']
),

-- BOOKS (4)
(
  'Atomic Habits: An Easy & Proven Way to Build Good Habits',
  'James Clear''s transformative guide to building good habits and breaking bad ones. Backed by behavioral science, this #1 New York Times bestseller has sold over 15 million copies worldwide.',
  14.99, 27.00, 'Books',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
  ARRAY['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'],
  4.8, 189234, true, true, false,
  null, 'Penguin Random House',
  ARRAY['self-help', 'habits', 'productivity', 'bestseller', 'nonfiction']
),
(
  'The Pragmatic Programmer: Your Journey to Mastery, 20th Anniversary Edition',
  'Andrew Hunt and David Thomas distill decades of software engineering wisdom into practical advice every developer can apply today. Required reading for professionals at every level.',
  43.99, 59.99, 'Books',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600',
  ARRAY['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800'],
  4.7, 14821, true, false, false,
  null, 'Addison-Wesley',
  ARRAY['programming', 'software', 'development', 'tech', 'engineering']
),
(
  'Dune (Deluxe Edition) by Frank Herbert',
  'The 50th anniversary collector''s hardcover edition of the greatest science fiction novel ever written. An epic tale of politics, religion, ecology, and human potential that defines the genre.',
  24.50, 35.00, 'Books',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600',
  ARRAY['https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800'],
  4.8, 34102, false, false, false,
  null, 'Ace Books',
  ARRAY['sci-fi', 'fiction', 'classic', 'dune', 'fantasy']
),
(
  'Clean Code: A Handbook of Agile Software Craftsmanship',
  'Robert C. Martin shows how to write code that is readable, maintainable, and adaptable. Includes real-world case studies in refactoring and code smells. A staple of every serious developer''s shelf.',
  38.49, 49.99, 'Books',
  'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=600',
  ARRAY['https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800'],
  4.6, 9823, true, false, false,
  null, 'Prentice Hall',
  ARRAY['programming', 'software', 'development', 'clean-code', 'agile']
),

-- BEAUTY (3)
(
  'CeraVe Moisturizing Cream 19 oz — Face & Body',
  'Developed with dermatologists. Contains 3 essential ceramides, hyaluronic acid, and patented MVE Technology that slowly releases moisturizing ingredients to maintain the skin barrier for 24 hours.',
  18.99, 24.99, 'Beauty',
  'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600',
  ARRAY['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800'],
  4.8, 89234, true, true, false,
  null, 'CeraVe',
  ARRAY['skincare', 'moisturizer', 'dermatologist', 'face', 'body']
),
(
  'Dyson Airwrap Multi-Styler Complete Long',
  'Styles and dries hair simultaneously — without extreme heat. The Coanda effect attracts and wraps hair around the barrel. Includes curling barrels, smoothing brushes, and volumizing attachments.',
  499.99, 599.99, 'Beauty',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
  ARRAY['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800'],
  4.5, 23187, false, true, false,
  null, 'Dyson',
  ARRAY['hair', 'styling', 'dyson', 'hair-dryer', 'beauty']
),
(
  'The Ordinary Niacinamide 10% + Zinc 1% Serum, 30ml',
  'High-strength vitamin and mineral blemish formula that targets the appearance of skin blemishes and congestion. Visibly improves the look of enlarged pores and uneven skin tone.',
  6.99, 9.99, 'Beauty',
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
  ARRAY['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800'],
  4.7, 52104, true, true, true,
  now() + interval '5 days', 'The Ordinary',
  ARRAY['serum', 'niacinamide', 'skincare', 'blemish', 'pores']
),

-- SPORTS & OUTDOORS (4)
(
  'Hydro Flask 32 oz Wide Mouth Water Bottle',
  'TempShield double-wall vacuum insulation keeps drinks cold 24 hours and hot 12 hours. BPA-free 18/8 pro-grade stainless steel. Dishwasher safe. Lifetime warranty.',
  44.95, null, 'Sports & Outdoors',
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
  ARRAY['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'],
  4.8, 67234, true, true, false,
  null, 'Hydro Flask',
  ARRAY['water-bottle', 'hydration', 'outdoor', 'stainless', 'hiking']
),
(
  'Bowflex SelectTech 552 Adjustable Dumbbells (Pair)',
  'Replaces 15 sets of weights. Adjust from 5 to 52.5 lbs using a simple dial mechanism. No more changing plates mid-workout. Includes JRNY app with on-demand trainer-led sessions.',
  399.00, 549.00, 'Sports & Outdoors',
  'https://images.unsplash.com/photo-1516611235576-35f4b6d6e2b4?w=600',
  ARRAY['https://images.unsplash.com/photo-1516611235576-35f4b6d6e2b4?w=800'],
  4.7, 31842, true, false, true,
  now() + interval '18 hours', 'Bowflex',
  ARRAY['dumbbells', 'weights', 'fitness', 'home-gym', 'strength']
),
(
  'Osprey Atmos AG 65 Backpacking Backpack',
  'Anti-Gravity suspension creates maximum contact with your back while conforming to your body shape. Fit-on-the-fly hipbelt adjusts on the trail. Includes integrated rain cover.',
  270.00, 340.00, 'Sports & Outdoors',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
  ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
  4.7, 8923, false, true, false,
  null, 'Osprey',
  ARRAY['backpack', 'hiking', 'camping', 'outdoors', 'travel']
),
(
  'Manduka PRO Yoga Mat 6mm — 71 Inch, Black',
  'Made with eco-certified natural rubber. Unmatched density at 6mm cushioning. Closed-cell surface prevents bacteria and sweat buildup. Backed by a lifetime guarantee.',
  120.00, 136.00, 'Sports & Outdoors',
  'https://images.unsplash.com/photo-1601925228103-5dd0c3deba82?w=600',
  ARRAY['https://images.unsplash.com/photo-1601925228103-5dd0c3deba82?w=800'],
  4.6, 18741, false, true, false,
  null, 'Manduka',
  ARRAY['yoga', 'mat', 'fitness', 'wellness', 'pilates']
),

-- CLOTHING (3)
(
  'Levi''s Men''s 501 Original Fit Straight Jeans',
  'The original blue jean since 1873. Button fly. Sits at the waist with a straight leg. 100% cotton denim that gets better with every wear. Available in multiple washes and lengths.',
  59.50, 79.50, 'Clothing',
  'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600',
  ARRAY['https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800'],
  4.5, 43128, true, false, false,
  null, 'Levi''s',
  ARRAY['jeans', 'denim', 'mens', 'clothing', 'casual']
),
(
  'Champion Women''s Reverse Weave Crewneck Sweatshirt',
  'Classic midweight crewneck in Champion''s signature Reverse Weave construction designed to reduce shrinkage. Reduced shoulder seam provides a comfortable, relaxed fit.',
  44.99, 55.00, 'Clothing',
  'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600',
  ARRAY['https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800'],
  4.4, 21089, false, true, false,
  null, 'Champion',
  ARRAY['sweatshirt', 'womens', 'casual', 'clothing', 'athleisure']
),
(
  'Allbirds Men''s Tree Runner Shoes',
  'Made from TENCEL Lyocell derived from eucalyptus trees. Ultra-breathable, moisture-wicking upper. Carbon footprint label on every pair. Machine washable. Weighs just 7.6 oz.',
  98.00, null, 'Clothing',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
  ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
  4.5, 9341, false, false, false,
  null, 'Allbirds',
  ARRAY['shoes', 'sneakers', 'sustainable', 'mens', 'running']
);
