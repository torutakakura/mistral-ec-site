-- タイムゾーン設定
alter database postgres set timezone to 'Asia/Tokyo';

---------- master table ----------

-- Create the flower_types table
CREATE TABLE flower_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL
);
-- flower_typesテーブルRLS設定
alter table flower_types enable row level security;
CREATE POLICY flower_types_policy ON flower_types
  USING (true) -- SELECT
  WITH CHECK (false); -- INSERT, UPDATE, DELETE

-- Create the how_to_uses table
CREATE TABLE how_to_uses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
-- how_to_usesテーブルRLS設定
alter table how_to_uses enable row level security;
CREATE POLICY how_to_uses_policy ON how_to_uses
  USING (true) -- SELECT
  WITH CHECK (false); -- INSERT, UPDATE, DELETE

-- Create the colors table
CREATE TABLE colors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  description TEXT NOT NULL
);
-- colorsテーブルRLS設定
alter table colors enable row level security;
CREATE POLICY colors_policy ON colors
  USING (true) -- SELECT
  WITH CHECK (false); -- INSERT, UPDATE, DELETE

-- Create the categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
-- categoriesテーブルRLS設定
alter table categories enable row level security;
CREATE POLICY categories_policy ON categories
  USING (true) -- SELECT
  WITH CHECK (false); -- INSERT, UPDATE, DELETE

-- Create the payment_methods table
CREATE TABLE payment_methods (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL
);
-- payment_methodsテーブルRLS設定
alter table payment_methods enable row level security;
CREATE POLICY payment_methods_policy ON payment_methods
  USING (true) -- SELECT
  WITH CHECK (false); -- INSERT, UPDATE, DELETE

-- Create the shipping_methods table
CREATE TABLE shipping_methods (
  id SERIAL PRIMARY KEY,
  prefecture TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);
-- shipping_methodsテーブルRLS設定
alter table shipping_methods enable row level security;
CREATE POLICY shipping_methods_policy ON shipping_methods
  USING (true) -- SELECT
  WITH CHECK (false); -- INSERT, UPDATE, DELETE


---------- basic table ----------

-- profilesテーブル作成
create table profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  name_kana TEXT,
  postcode  TEXT,
  prefecture TEXT,
  city_street_address TEXT,
  building_apartment TEXT,
  company_department TEXT,
  phone_number TEXT,
  use_postbox BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- profilesテーブルRLS設定
alter table profiles enable row level security;
create policy "自身のプロフィールを参照" on profiles for select using (auth.uid() = id);
create policy "自身のプロフィールを更新" on profiles for update using (auth.uid() = id);

-- サインアップ時にプロフィールテーブル作成する関数
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- サインアップ時にプロフィールテーブル作成する関数を呼び出すトリガー
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Create the addresses table
CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  name_kana TEXT,
  postcode  TEXT,
  prefecture TEXT,
  city_street_address TEXT,
  building_apartment TEXT,
  company_department TEXT,
  phone_number TEXT,
  use_postbox BOOLEAN,
  is_ordered BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- addressesテーブルRLS設定
alter table addresses enable row level security;
create policy "自身のアドレスを参照" on addresses for select using (auth.uid() = user_id);
create policy "自身のアドレスを追加" on addresses for insert with check (auth.uid() = user_id);
create policy "自身のアドレスを更新" on addresses for update using (auth.uid() = user_id);
create policy "自身のアドレスを削除" on addresses for delete using (auth.uid() = user_id);


-- Create the products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  apeal TEXT NOT NULL,
  image TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  description TEXT NOT NULL,
  color_id INTEGER REFERENCES colors(id) ON DELETE CASCADE,
  flower_id INTEGER REFERENCES flower_types(id) ON DELETE CASCADE,
  using_id  INTEGER REFERENCES how_to_uses(id) ON DELETE CASCADE,
  is_recommended BOOLEAN,
  for_restaurant BOOLEAN,
  for_present BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- productsテーブルRLS設定
alter table products enable row level security;
create policy "商品情報は誰でも参照可" on products for select using (true);
create policy "商品情報は認証済ユーザのみ追加可" on products for insert with check (auth.role() = 'authenticator');
create policy "商品情報は認証済ユーザのみ更新可" on products for update using (auth.role() = 'authenticator');
create policy "商品情報は認証済ユーザのみ削除可" on products for delete using (auth.role() = 'authenticator');

-- Create the payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  payment_method_id INTEGER NOT NULL REFERENCES payment_methods(id),
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- order_itemsテーブルRLS設定
alter table payments enable row level security;
create policy "支払いは認証済ユーザのみ参照可" on payments for select to authenticated using (true);
create policy "支払いは認証済ユーザのみ追加可" on payments for insert to authenticated with check (true);
create policy "支払いは認証済ユーザのみ更新可" on payments for update to authenticated using (true);
create policy "支払いは認証済ユーザのみ削除可" on payments for delete to authenticated using (true);


-- Create the orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  charge_id TEXT NOT NULL UNIQUE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  payment_method_id INTEGER REFERENCES payment_methods(id) ON DELETE CASCADE,
  shipping_method_id INTEGER REFERENCES shipping_methods(id) ON DELETE CASCADE,
  payment_id INTEGER REFERENCES payments(id) ON DELETE CASCADE,
  delivery_id INTEGER REFERENCES addresses(id) ON DELETE CASCADE,
  delivery_date TEXT NOT NULL,
  delivery_time TEXT NOT NULL,
  what_using TEXT NOT NULL,
  order_request TEXT NOT NULL,
  order_status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ordersテーブルRLS設定
alter table orders enable row level security;
create policy "注文情報は認証済ユーザのみ参照可" on orders for select using (auth.uid() = user_id);
create policy "注文情報は認証済ユーザのみ追加可" on orders for insert with check (auth.uid() = user_id);
create policy "注文情報は認証済ユーザのみ更新可" on orders for update using (auth.uid() = user_id);
create policy "注文情報は認証済ユーザのみ削除可" on orders for delete using (auth.uid() = user_id);


-- Create the order_items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  delivery_status INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

-- order_itemsテーブルRLS設定
alter table order_items enable row level security;
create policy "注文品は認証済ユーザのみ参照可" on order_items for select to authenticated using (true);
create policy "注文品は認証済ユーザのみ追加可" on order_items for insert to authenticated with check (true);
create policy "注文品は認証済ユーザのみ更新可" on order_items for update to authenticated using (true);
create policy "注文品は認証済ユーザのみ削除可" on order_items for delete to authenticated using (true);


-- productのstorage作成
insert into storage.buckets (id, name, public) values ('products', 'products', true);
create policy "商品画像は誰でも参照可" on storage.objects for select using ( bucket_id = 'products');
create policy "商品画像は認証済ユーザのみ追加可" on storage.objects for insert with check ( bucket_id = 'products' AND auth.role() = 'authenticator');
create policy "商品画像は認証済ユーザのみ更新可" on storage.objects for update with check ( bucket_id = 'products' AND auth.role() = 'authenticator');
create policy "商品画像は認証済ユーザのみ削除可" on storage.objects for delete using ( bucket_id = 'products' AND auth.role() = 'authenticator');

-- publicでstorageを作成する場合
insert into storage.buckets (id, name, public) values ('flower-types', 'flower-types', true);
create policy "花種類画像は誰でも参照可" on storage.objects for select using ( bucket_id = 'flower-types' );
create policy "花種類画像は認証済ユーザのみ追加可" on storage.objects for insert with check ( bucket_id = 'flower-types' AND auth.role() = 'authenticator');
create policy "花種類画像は認証済ユーザのみ更新可" on storage.objects for update with check ( bucket_id = 'flower-types' AND auth.role() = 'authenticator');
create policy "花種類画像は認証済ユーザのみ削除可" on storage.objects for delete using ( bucket_id = 'flower-types' AND auth.role() = 'authenticator');

-- publicでstorageを作成する場合
insert into storage.buckets (id, name, public) values ('shops', 'shops', true);
create policy "店舗画像は誰でも参照可" on storage.objects for select using ( bucket_id = 'shops' );
create policy "店舗画像は認証済ユーザのみ追加可" on storage.objects for insert with check ( bucket_id = 'shops' AND auth.role() = 'authenticator');
create policy "店舗画像は認証済ユーザのみ更新可" on storage.objects for update with check ( bucket_id = 'shops' AND auth.role() = 'authenticator');
create policy "店舗画像は認証済ユーザのみ削除可" on storage.objects for delete using ( bucket_id = 'shops' AND auth.role() = 'authenticator');
