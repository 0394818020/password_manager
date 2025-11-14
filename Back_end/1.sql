users {
	id INT auto_increment primary key,
	username varchar(255) unique NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL unique
}

otp {
	id INT auto_increment primary key,
    email varchar(255) NOT NULL,
    otp varchar(6) NOT NULL,
    foreign key (email) references users(email),
    time_existed datetime
}

session {
    id auto_increment primary key,
    userId INT,
    refreshToken varchar(255) unique,
    time_existed datetime,
    foreign key (userId) references users(id)
}

accounts {
    id INT auto_increment primary key,
    userId INT,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    application varchar(255) NOT NULL,
    foreign key (userId) references users(id)
}

users.id - otp.userId
users.id < session.userId
users.id < accounts.userId
