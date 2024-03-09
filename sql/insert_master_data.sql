-- Insert initial data for flower_types
INSERT INTO flower_types (name, image) VALUES
  ('アレンジメント', 'Type-Arrangement.webp'),
  ('花束・ブーケ', 'Type-Bouquet.webp'),
  ('スタンド花', 'Type-StandFlower.webp'),
  ('胡蝶蘭', 'Type-Kochoran.webp'),
  ('観葉植物', 'Type-Plants.webp'),
  ('スワッグ', 'Type-Swag.webp');

-- Insert initial data for how_to_uses
INSERT INTO how_to_uses (name) VALUES
  ('お祝い'),
  ('結婚記念日'),
  ('開業・開店祝い'),
  ('新築・引越し祝い'),
  ('出産祝い'),
  ('発表会・公演祝い'),
  ('入学・卒業祝い'),
  ('お見舞い'),
  ('お悔み・お供え'),
  ('自宅用'),
  ('その他');

-- Insert initial data for colors
INSERT INTO colors (name, class_name, description) VALUES
  ('Red', 'red', 'ロマンチックなデートやプロポーズ、記念日など、愛を表現したいシーンに最適です!'),
  ('White・Green', 'white_green', '結婚式やお祝い事、お見舞いなど、清潔感や爽やかさが求められるシーンに最適です!'),
  ('Pink', 'pink', '誕生日やバレンタインデー、母の日など、女性に贈る場合や優しい気持ちを伝えたいシーンに最適です!'),
  ('Yellow・Orange', 'yellow_orange', 'お祝いや励まし、新しいことにチャレンジする人に贈る場合に最適です!'),
  ('Violet・Blue', 'violet_blue', '送別会や退職祝い、感謝の気持ちを伝えたいシーンに最適です! ビジネスシーンでも使用されます。'),
  ('Mix Color', 'mix_color', '多彩な印象を与えます。複数の色が混ざり合うことで、豊かな表現力が生まれます。');

-- Insert initial data for payment_methods
INSERT INTO payment_methods (name, image) VALUES
  ('Credit-Card', 'Card-5brand.png'),
  ('PayPay', 'PayPay.jpg');

-- Insert initial data for shipping_methods
INSERT INTO shipping_methods (prefecture, price) VALUES
  ('北海道', 1320),
  ('青森県', 1100),
  ('岩手県', 1100),
  ('宮城県', 913),
  ('秋田県', 1100),
  ('山形県', 913),
  ('福島県', 913),
  ('茨城県', 913),
  ('栃木県', 913),
  ('群馬県', 913),
  ('埼玉県', 913),
  ('千葉県', 913),
  ('東京都', 913),
  ('神奈川県', 913),
  ('新潟県', 913),
  ('富山県', 913),
  ('石川県', 913),
  ('福井県', 913),
  ('山梨県', 913),
  ('長野県', 913),
  ('岐阜県', 913),
  ('静岡県', 913),
  ('愛知県', 913),
  ('三重県', 913),
  ('滋賀県', 1100),
  ('京都府', 1100),
  ('大阪府', 1100),
  ('兵庫県', 1100),
  ('奈良県', 1100),
  ('和歌山県', 1100),
  ('鳥取県', 1100),
  ('島根県', 1100),
  ('岡山県', 1100),
  ('広島県', 1100),
  ('山口県', 1100),
  ('徳島県', 1100),
  ('香川県', 1100),
  ('愛媛県', 1100),
  ('高知県', 1100),
  ('福岡県', 1320),
  ('佐賀県', 1320),
  ('長崎県', 1320),
  ('熊本県', 1320),
  ('大分県', 1320),
  ('宮崎県', 1320),
  ('鹿児島県', 1320),
  ('沖縄県', 3036);
