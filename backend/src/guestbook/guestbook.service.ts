import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  }

  async findAll() {
    const { data } = await this.supabase.from('guestbook').select('*').order('created_at', { ascending: false });
    return data;
  }

  async create(payload: any) {
    const { data } = await this.supabase.from('guestbook').insert([payload]).select();
    return data;
  }

  async update(id: string, payload: any) {
    const { data } = await this.supabase.from('guestbook').update(payload).eq('id', id).select();
    return data;
  }

  async remove(id: string) {
    const { data } = await this.supabase.from('guestbook').delete().eq('id', id);
    return data;
  }
}