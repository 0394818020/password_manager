users {
    id : INT auto_increment primary key,
    username: varchar(255) NOT NULL unique,
    password: varchar(255) NOT NULL,
    email : varchar(255) NOT NULL unique
}

otp {
    id : INT auto_increment primary key,
    otp : varchar(6) NOT NULL,
    email: varchar(255) ,
    time_existed: datetime,
    foreign key (email) references users(email)
}