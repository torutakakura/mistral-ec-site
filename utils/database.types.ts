export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          building_apartment: string | null
          city_street_address: string | null
          company_department: string | null
          created_at: string
          id: number
          is_ordered: boolean | null
          name: string | null
          name_kana: string | null
          phone_number: string | null
          postcode: string | null
          prefecture: string | null
          updated_at: string
          use_postbox: boolean | null
          user_id: string | null
        }
        Insert: {
          building_apartment?: string | null
          city_street_address?: string | null
          company_department?: string | null
          created_at?: string
          id?: number
          is_ordered?: boolean | null
          name?: string | null
          name_kana?: string | null
          phone_number?: string | null
          postcode?: string | null
          prefecture?: string | null
          updated_at?: string
          use_postbox?: boolean | null
          user_id?: string | null
        }
        Update: {
          building_apartment?: string | null
          city_street_address?: string | null
          company_department?: string | null
          created_at?: string
          id?: number
          is_ordered?: boolean | null
          name?: string | null
          name_kana?: string | null
          phone_number?: string | null
          postcode?: string | null
          prefecture?: string | null
          updated_at?: string
          use_postbox?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      colors: {
        Row: {
          class_name: string
          description: string
          id: number
          name: string
        }
        Insert: {
          class_name: string
          description: string
          id?: number
          name: string
        }
        Update: {
          class_name?: string
          description?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      flower_types: {
        Row: {
          id: number
          image: string
          name: string
        }
        Insert: {
          id?: number
          image: string
          name: string
        }
        Update: {
          id?: number
          image?: string
          name?: string
        }
        Relationships: []
      }
      how_to_uses: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          delivery_status: number
          id: number
          order_id: number
          price: number
          product_id: number
          quantity: number
        }
        Insert: {
          delivery_status: number
          id?: number
          order_id: number
          price: number
          product_id: number
          quantity: number
        }
        Update: {
          delivery_status?: number
          id?: number
          order_id?: number
          price?: number
          product_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          charge_id: string
          created_at: string
          delivery_date: string
          delivery_id: number | null
          delivery_time: string
          id: number
          order_request: string
          order_status: string
          payment_id: number | null
          payment_method_id: number | null
          shipping_method_id: number | null
          updated_at: string
          user_id: string | null
          what_using: string
        }
        Insert: {
          charge_id: string
          created_at?: string
          delivery_date: string
          delivery_id?: number | null
          delivery_time: string
          id?: number
          order_request: string
          order_status: string
          payment_id?: number | null
          payment_method_id?: number | null
          shipping_method_id?: number | null
          updated_at?: string
          user_id?: string | null
          what_using: string
        }
        Update: {
          charge_id?: string
          created_at?: string
          delivery_date?: string
          delivery_id?: number | null
          delivery_time?: string
          id?: number
          order_request?: string
          order_status?: string
          payment_id?: number | null
          payment_method_id?: number | null
          shipping_method_id?: number | null
          updated_at?: string
          user_id?: string | null
          what_using?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_delivery_id_fkey"
            columns: ["delivery_id"]
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_payment_id_fkey"
            columns: ["payment_id"]
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_payment_method_id_fkey"
            columns: ["payment_method_id"]
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shipping_method_id_fkey"
            columns: ["shipping_method_id"]
            referencedRelation: "shipping_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_methods: {
        Row: {
          id: number
          image: string
          name: string
        }
        Insert: {
          id?: number
          image: string
          name: string
        }
        Update: {
          id?: number
          image?: string
          name?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: number
          payment_method_id: number
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: number
          payment_method_id: number
          status: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: number
          payment_method_id?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_payment_method_id_fkey"
            columns: ["payment_method_id"]
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          apeal: string
          color_id: number | null
          created_at: string
          description: string
          flower_id: number | null
          for_present: boolean | null
          for_restaurant: boolean | null
          id: number
          image: string
          is_recommended: boolean | null
          name: string
          price: number
          updated_at: string
          using_id: number | null
        }
        Insert: {
          apeal: string
          color_id?: number | null
          created_at?: string
          description: string
          flower_id?: number | null
          for_present?: boolean | null
          for_restaurant?: boolean | null
          id?: number
          image: string
          is_recommended?: boolean | null
          name: string
          price: number
          updated_at?: string
          using_id?: number | null
        }
        Update: {
          apeal?: string
          color_id?: number | null
          created_at?: string
          description?: string
          flower_id?: number | null
          for_present?: boolean | null
          for_restaurant?: boolean | null
          id?: number
          image?: string
          is_recommended?: boolean | null
          name?: string
          price?: number
          updated_at?: string
          using_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_color_id_fkey"
            columns: ["color_id"]
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_flower_id_fkey"
            columns: ["flower_id"]
            referencedRelation: "flower_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_using_id_fkey"
            columns: ["using_id"]
            referencedRelation: "how_to_uses"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          building_apartment: string | null
          city_street_address: string | null
          company_department: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          name_kana: string | null
          phone_number: string | null
          postcode: string | null
          prefecture: string | null
          updated_at: string
          use_postbox: boolean | null
        }
        Insert: {
          building_apartment?: string | null
          city_street_address?: string | null
          company_department?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          name_kana?: string | null
          phone_number?: string | null
          postcode?: string | null
          prefecture?: string | null
          updated_at?: string
          use_postbox?: boolean | null
        }
        Update: {
          building_apartment?: string | null
          city_street_address?: string | null
          company_department?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          name_kana?: string | null
          phone_number?: string | null
          postcode?: string | null
          prefecture?: string | null
          updated_at?: string
          use_postbox?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      shipping_methods: {
        Row: {
          id: number
          prefecture: string
          price: number
        }
        Insert: {
          id?: number
          prefecture: string
          price: number
        }
        Update: {
          id?: number
          prefecture?: string
          price?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
