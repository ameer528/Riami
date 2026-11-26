create extension if not exists "uuid-ossp";
create extension if not exists vector;

create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table users (
  id uuid primary key references auth.users(id),
  org_id uuid references organizations(id) on delete cascade,
  email text unique not null,
  role text default 'owner',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table company_knowledge (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  content text not null,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table agents (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  name text not null,
  role text not null,
  autonomy_level integer default 1,
  status text default 'active',
  system_prompt text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table leads (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  company_name text not null,
  contact_name text,
  email text,
  status text default 'new',
  score integer default 0,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table agent_executions (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  agent_id uuid references agents(id),
  task_description text not null,
  status text default 'running',
  result jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table organizations enable row level security;
alter table users enable row level security;
alter table company_knowledge enable row level security;
alter table agents enable row level security;
alter table leads enable row level security;
alter table agent_executions enable row level security;

create policy "Users can view own org" on users for select using (auth.uid() = id);
create policy "Users can view own org knowledge" on company_knowledge for all using (org_id in (select org_id from users where id = auth.uid()));
create policy "Users can view own org agents" on agents for all using (org_id in (select org_id from users where id = auth.uid()));
create policy "Users can view own org leads" on leads for all using (org_id in (select org_id from users where id = auth.uid()));
create policy "Users can view own org executions" on agent_executions for all using (org_id in (select org_id from users where id = auth.uid()));
