-- トリガーの削除
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 関数の削除
DROP FUNCTION IF EXISTS public.handle_new_user();

-- basic tablesの削除
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- master tablesの削除
DROP TABLE IF EXISTS shipping_methods CASCADE;
DROP TABLE IF EXISTS payment_methods CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS colors CASCADE;
DROP TABLE IF EXISTS how_to_uses CASCADE;
DROP TABLE IF EXISTS flower_types CASCADE;

-- バケットの削除 (objectsを含むバケットを削除するためには、先にobjectsを削除する必要があります)
DELETE FROM auth.users;
DELETE FROM storage.objects WHERE bucket_id = 'shops';
DELETE FROM storage.objects WHERE bucket_id = 'products';
DELETE FROM storage.objects WHERE bucket_id = 'flower-types';
DELETE FROM storage.buckets WHERE id = 'shops';
DELETE FROM storage.buckets WHERE id = 'products';
DELETE FROM storage.buckets WHERE id = 'flower-types';

-- basic tablesのポリシー削除
DROP POLICY IF EXISTS "自身のプロフィールを更新" ON profiles;
DROP POLICY IF EXISTS "自身のプロフィールを参照" ON profiles;

DROP POLICY IF EXISTS "自身のアドレスを削除" ON addresses;
DROP POLICY IF EXISTS "自身のアドレスを更新" ON addresses;
DROP POLICY IF EXISTS "自身のアドレスを追加" ON addresses;
DROP POLICY IF EXISTS "自身のアドレスを参照" ON addresses;

DROP POLICY IF EXISTS "商品情報は認証済ユーザのみ削除可" ON products;
DROP POLICY IF EXISTS "商品情報は認証済ユーザのみ更新可" ON products;
DROP POLICY IF EXISTS "商品情報は認証済ユーザのみ追加可" ON products;
DROP POLICY IF EXISTS "商品情報は誰でも参照可" ON products;

DROP POLICY IF EXISTS "注文情報は認証済ユーザのみ削除可" ON orders;
DROP POLICY IF EXISTS "注文情報は認証済ユーザのみ更新可" ON orders;
DROP POLICY IF EXISTS "注文情報は認証済ユーザのみ追加可" ON orders;
DROP POLICY IF EXISTS "注文情報は認証済ユーザのみ参照可" ON orders;

DROP POLICY IF EXISTS "注文品は認証済ユーザのみ削除可" ON order_items;
DROP POLICY IF EXISTS "注文品は認証済ユーザのみ更新可" ON order_items;
DROP POLICY IF EXISTS "注文品は認証済ユーザのみ追加可" ON order_items;
DROP POLICY IF EXISTS "注文品は認証済ユーザのみ参照可" ON order_items;

DROP POLICY IF EXISTS "支払いは認証済ユーザのみ削除可" ON payments;
DROP POLICY IF EXISTS "支払いは認証済ユーザのみ更新可" ON payments;
DROP POLICY IF EXISTS "支払いは認証済ユーザのみ追加可" ON payments;
DROP POLICY IF EXISTS "支払いは認証済ユーザのみ参照可" ON payments;

-- master tablesのポリシー削除
DROP POLICY IF EXISTS shipping_methods_policy ON shipping_methods;
DROP POLICY IF EXISTS payment_methods_policy ON payment_methods;
DROP POLICY IF EXISTS categories_policy ON categories;
DROP POLICY IF EXISTS colors_policy ON colors;
DROP POLICY IF EXISTS how_to_uses_policy ON how_to_uses;
DROP POLICY IF EXISTS flower_types_policy ON flower_types;

-- バケットのポリシー削除
DROP POLICY IF EXISTS "商品画像は誰でも参照可" ON storage.objects;
DROP POLICY IF EXISTS "商品画像は認証済ユーザのみ削除可" ON storage.objects;
DROP POLICY IF EXISTS "商品画像は認証済ユーザのみ更新可" ON storage.objects;
DROP POLICY IF EXISTS "商品画像は認証済ユーザのみ追加可" ON storage.objects;

-- バケットのポリシー削除
DROP POLICY IF EXISTS "花種類画像は誰でも参照可" ON storage.objects;
DROP POLICY IF EXISTS "花種類画像は認証済ユーザのみ追加可" ON storage.objects;
DROP POLICY IF EXISTS "花種類画像は認証済ユーザのみ更新可" ON storage.objects;
DROP POLICY IF EXISTS "花種類画像は認証済ユーザのみ削除可" ON storage.objects;

-- バケットのポリシー削除
DROP POLICY IF EXISTS "店舗画像は誰でも参照可" ON storage.objects;
DROP POLICY IF EXISTS "店舗画像は認証済ユーザのみ追加可" ON storage.objects;
DROP POLICY IF EXISTS "店舗画像は認証済ユーザのみ更新可" ON storage.objects;
DROP POLICY IF EXISTS "店舗画像は認証済ユーザのみ削除可" ON storage.objects;

-- タイムゾーン設定のリセット
ALTER DATABASE postgres RESET timezone;
