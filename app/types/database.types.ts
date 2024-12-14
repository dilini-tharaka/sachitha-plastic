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
      categories: {
        Row: {
          created_at: string
          id: number
          image: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          image: string
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string
          name?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          email: string
          id: number
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      inquiry_status: {
        Row: {
          created_at: string
          id: number
          inquiry_id: number
          status: Database["public"]["Enums"]["InquiryStatus"]
        }
        Insert: {
          created_at?: string
          id?: number
          inquiry_id: number
          status?: Database["public"]["Enums"]["InquiryStatus"]
        }
        Update: {
          created_at?: string
          id?: number
          inquiry_id?: number
          status?: Database["public"]["Enums"]["InquiryStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "inquiry_status_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: true
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          created_at: string
          email: string
          id: number
          is_used: boolean
          role: Database["public"]["Enums"]["Role"]
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          is_used?: boolean
          role?: Database["public"]["Enums"]["Role"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          is_used?: boolean
          role?: Database["public"]["Enums"]["Role"]
        }
        Relationships: []
      }
      product_images: {
        Row: {
          created_at: string
          id: number
          path: string
          product_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          path: string
          product_id: number
        }
        Update: {
          created_at?: string
          id?: number
          path?: string
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_statistics: {
        Row: {
          date: string
          id: number
          product_id: number
          views: number
        }
        Insert: {
          date: string
          id?: number
          product_id: number
          views?: number
        }
        Update: {
          date?: string
          id?: number
          product_id?: number
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_statistics_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          availability: Database["public"]["Enums"]["Availability"]
          category_id: number
          created_at: string
          description: string
          id: number
          name: string
          status: Database["public"]["Enums"]["ProductStatus"]
        }
        Insert: {
          availability?: Database["public"]["Enums"]["Availability"]
          category_id: number
          created_at?: string
          description: string
          id?: number
          name: string
          status?: Database["public"]["Enums"]["ProductStatus"]
        }
        Update: {
          availability?: Database["public"]["Enums"]["Availability"]
          category_id?: number
          created_at?: string
          description?: string
          id?: number
          name?: string
          status?: Database["public"]["Enums"]["ProductStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      user_status: {
        Row: {
          created_at: string
          id: number
          role: Database["public"]["Enums"]["Role"]
          status: Database["public"]["Enums"]["UserStatus"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          role: Database["public"]["Enums"]["Role"]
          status?: Database["public"]["Enums"]["UserStatus"]
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["Role"]
          status?: Database["public"]["Enums"]["UserStatus"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin_user: {
        Args: {
          user_id_input: string
        }
        Returns: boolean
      }
    }
    Enums: {
      Availability: "InStock" | "OutOfStock"
      InquiryStatus: "Pending" | "Resolved"
      ProductStatus: "Active" | "Draft" | "Hidden"
      Role: "Admin" | "Moderator"
      UserStatus: "Active" | "Pending" | "Suspended" | "Removed"
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
