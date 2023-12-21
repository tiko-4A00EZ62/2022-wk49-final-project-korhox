create table
  expenses (
    id int auto_increment,
    recipient varchar(255) null,
    description text null,
    category varchar(255) null,
    amount float not null,
    date timestamp default CURRENT_TIMESTAMP not null,
    constraint expenses_pk unique (id)
  ) character
set
  utf8mb4 collate utf8mb4_unicode_ci;
