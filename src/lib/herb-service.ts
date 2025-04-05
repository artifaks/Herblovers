import { supabase } from './supabase';
import { Herb } from '@/data/herbs';

// Table name for herbs in Supabase
const HERBS_TABLE = 'herbs';

/**
 * Add a new herb to the database
 */
export const addHerb = async (herb: Herb): Promise<{ success: boolean; error?: string }> => {
  try {
    // Check if herb already exists
    const { data: existingHerb } = await supabase
      .from(HERBS_TABLE)
      .select('id')
      .eq('id', herb.id)
      .single();

    if (existingHerb) {
      return { 
        success: false, 
        error: `Herb with ID "${herb.id}" already exists.` 
      };
    }

    // Insert the new herb
    const { error } = await supabase
      .from(HERBS_TABLE)
      .insert(herb);

    if (error) {
      console.error('Error adding herb:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error adding herb:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Get all herbs from the database
 */
export const getAllHerbs = async (): Promise<{ herbs: Herb[]; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from(HERBS_TABLE)
      .select('*');

    if (error) {
      console.error('Error fetching herbs:', error);
      return { 
        herbs: [], 
        error: error.message 
      };
    }

    return { herbs: data as Herb[] || [] };
  } catch (error) {
    console.error('Error fetching herbs:', error);
    return { 
      herbs: [], 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Update an existing herb in the database
 */
export const updateHerb = async (herb: Herb): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from(HERBS_TABLE)
      .update(herb)
      .eq('id', herb.id);

    if (error) {
      console.error('Error updating herb:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating herb:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Delete a herb from the database
 */
export const deleteHerb = async (herbId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from(HERBS_TABLE)
      .delete()
      .eq('id', herbId);

    if (error) {
      console.error('Error deleting herb:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting herb:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};
