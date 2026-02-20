import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase = createClient(
    process.env.SUPABASE_URL!, 
    process.env.SUPABASE_KEY!
  );

  async findAll() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data;
  }

  async create(payload: { name: string; message: string }) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([payload])
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .update({ message })
      .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
  }

  async delete(id: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
  }
}