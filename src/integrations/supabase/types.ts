export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ebooks: {
        Row: {
          author: string
          cover_image_url: string | null
          created_at: string | null
          description: string
          file_url: string | null
          id: string
          price: number
          published_date: string | null
          stripe_price_id: string | null
          stripe_product_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          cover_image_url?: string | null
          created_at?: string | null
          description: string
          file_url?: string | null
          id?: string
          price: number
          published_date?: string | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          cover_image_url?: string | null
          created_at?: string | null
          description?: string
          file_url?: string | null
          id?: string
          price?: number
          published_date?: string | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      favorite_herbs: {
        Row: {
          created_at: string | null
          herb_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          herb_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          herb_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      favorite_recipes: {
        Row: {
          created_at: string | null
          id: string
          recipe_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          recipe_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          recipe_id?: string
          user_id?: string
        }
        Relationships: []
      }
      herbs: {
        Row: {
          benefits: string[] | null
          category: string | null
          common_name: string
          contraindications: string[] | null
          created_at: string | null
          description: string
          dosage: Json | null
          family: string
          id: string
          image_url: string | null
          preparation_methods: Json | null
          scientific_name: string
          side_effects: string[] | null
          traditional_uses: string[] | null
          updated_at: string | null
        }
        Insert: {
          benefits?: string[] | null
          category?: string | null
          common_name: string
          contraindications?: string[] | null
          created_at?: string | null
          description: string
          dosage?: Json | null
          family: string
          id?: string
          image_url?: string | null
          preparation_methods?: Json | null
          scientific_name: string
          side_effects?: string[] | null
          traditional_uses?: string[] | null
          updated_at?: string | null
        }
        Update: {
          benefits?: string[] | null
          category?: string | null
          common_name?: string
          contraindications?: string[] | null
          created_at?: string | null
          description?: string
          dosage?: Json | null
          family?: string
          id?: string
          image_url?: string | null
          preparation_methods?: Json | null
          scientific_name?: string
          side_effects?: string[] | null
          traditional_uses?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          subscription_tier: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: string
        }
        Insert: {
          id: string
          role?: string
        }
        Update: {
          id?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_by_email: {
        Args: {
          email_input: string
        }
        Returns: {
          id: string
        }[]
      }
      make_user_admin: {
        Args: {
          email: string
        }
        Returns: undefined
      }
    }
    Enums: {
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
