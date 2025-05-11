create TABLE person(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    login VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255)
);

create TABLE request(
    id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    contacts VARCHAR(255),
    date VARCHAR(255),
    time VARCHAR(255),
    request_type VARCHAR(255),
    payment_type VARCHAR(255),
    status VARCHAR(255),
    description VARCHAR(255),
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person (id)
);