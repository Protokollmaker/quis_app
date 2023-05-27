export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
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
            group: {
                Row: {
                    created_at: string
                    created_by: string
                    id: string
                    question: Json
                    title: string
                }
                Insert: {
                    created_at?: string
                    created_by: string
                    id?: string
                    question: Json
                    title: string
                }
                Update: {
                    created_at?: string
                    created_by?: string
                    id?: string
                    question?: Json
                    title?: string
                }
            }
            groupAnswers: {
                Row: {
                    answersCorrect: number | null
                    answersWrong: number | null
                    awnsersGiven: Json | null
                    created_at: string | null
                    group: string | null
                    id: string
                    trys: number | null
                    user: string | null
                }
                Insert: {
                    answersCorrect?: number | null
                    answersWrong?: number | null
                    awnsersGiven?: Json | null
                    created_at?: string | null
                    group?: string | null
                    id?: string
                    trys?: number | null
                    user?: string | null
                }
                Update: {
                    answersCorrect?: number | null
                    answersWrong?: number | null
                    awnsersGiven?: Json | null
                    created_at?: string | null
                    group?: string | null
                    id?: string
                    trys?: number | null
                    user?: string | null
                }
            }
            Questions: {
                Row: {
                    answers: Json
                    created_at: string | null
                    id: string
                    owner: string | null
                    question: Json
                    tags: Json | null
                    Title: string | null
                    Type: string
                    validation: Json | null
                    version: number | null
                }
                Insert: {
                    answers: Json
                    created_at?: string | null
                    id?: string
                    owner?: string | null
                    question: Json
                    tags?: Json | null
                    Title?: string | null
                    Type: string
                    validation?: Json | null
                    version?: number | null
                }
                Update: {
                    answers?: Json
                    created_at?: string | null
                    id?: string
                    owner?: string | null
                    question?: Json
                    tags?: Json | null
                    Title?: string | null
                    Type?: string
                    validation?: Json | null
                    version?: number | null
                }
            }
            QuestionsAnswered: {
                Row: {
                    Antwort: Json
                    created_at: string
                    id: string
                    is_Correct: boolean
                    Question: string | null
                    user_id: string | null
                }
                Insert: {
                    Antwort: Json
                    created_at?: string
                    id?: string
                    is_Correct: boolean
                    Question?: string | null
                    user_id?: string | null
                }
                Update: {
                    Antwort?: Json
                    created_at?: string
                    id?: string
                    is_Correct?: boolean
                    Question?: string | null
                    user_id?: string | null
                }
            }
            User: {
                Row: {
                    "Aktuelle Frage": string | null
                    "Gesamt Falsch Beantwortete Fragen": number | null
                    "Gesamt Richtig Beantwortete Fragen": number | null
                    Gruppe: string | null
                    Name: string | null
                    rolle: Json | null
                    "Session Falsch Beantwortete Fragen": number | null
                    "Session Richtig Beantwortete Fragen": number | null
                    user_id: string
                }
                Insert: {
                    "Aktuelle Frage"?: string | null
                    "Gesamt Falsch Beantwortete Fragen"?: number | null
                    "Gesamt Richtig Beantwortete Fragen"?: number | null
                    Gruppe?: string | null
                    Name?: string | null
                    rolle?: Json | null
                    "Session Falsch Beantwortete Fragen"?: number | null
                    "Session Richtig Beantwortete Fragen"?: number | null
                    user_id?: string
                }
                Update: {
                    "Aktuelle Frage"?: string | null
                    "Gesamt Falsch Beantwortete Fragen"?: number | null
                    "Gesamt Richtig Beantwortete Fragen"?: number | null
                    Gruppe?: string | null
                    Name?: string | null
                    rolle?: Json | null
                    "Session Falsch Beantwortete Fragen"?: number | null
                    "Session Richtig Beantwortete Fragen"?: number | null
                    user_id?: string
                }
            }
        }
        Views: {
            QuestionsRandom: {
                Row: {
                    answers: Json | null
                    created_at: string | null
                    id: string | null
                    owner: string | null
                    question: Json | null
                    tags: Json | null
                    Title: string | null
                    Type: string | null
                    validation: Json | null
                    version: number | null
                }
                Insert: {
                    answers?: Json | null
                    created_at?: string | null
                    id?: string | null
                    owner?: string | null
                    question?: Json | null
                    tags?: Json | null
                    Title?: string | null
                    Type?: string | null
                    validation?: Json | null
                    version?: number | null
                }
                Update: {
                    answers?: Json | null
                    created_at?: string | null
                    id?: string | null
                    owner?: string | null
                    question?: Json | null
                    tags?: Json | null
                    Title?: string | null
                    Type?: string | null
                    validation?: Json | null
                    version?: number | null
                }
            }
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
                    public?: boolean | null
                    updated_at?: string | null
                }
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
                    path_tokens?: string[] | null
                    updated_at?: string | null
                    version?: string | null
                }
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