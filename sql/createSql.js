module.exports = [
  {
    drop: 'DROP TABLE IF EXISTS `online_course_user`;',
    create: `CREATE TABLE online_course_user (
      id int NOT NULL AUTO_INCREMENT ,
      name varchar(50)  NOT NULL ,
      password varchar(16) NOT NULL,
      phone varchar(11) NOT NULL ,
      balance int NULL ,
      bank_card_no varchar(19) NOT NULL , 
      id_card_no varchar(18) NOT NULL ,
      gmt_create_time int NOT NULL ,
      status int DEFAULT 200 NULL ,
      info varchar(500) NULL  ,
      extra_info varchar(300) NOT NULL DEFAULT '{}' ,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB;`,
  },
  {
    drop: 'DROP TABLE IF EXISTS online_course_manager;',
    create: `CREATE TABLE online_course_manager (
      id int NOT NULL AUTO_INCREMENT ,
      name varchar(50)  NOT NULL ,
      password varchar(16) NOT NULL ,
      phone varchar(11) NOT NULL ,
      balance int NULL ,
      bank_card_no varchar(19) NULL ,
      id_card_no varchar(18) NULL ,
      profession_no varchar(18) NULL ,
      gmt_create_time varchar(20) NOT NULL ,
      status int NULL DEFAULT 200 ,
      info varchar(500) NULL ,
      extra_info varchar(300) NOT NULL DEFAULT '{}',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB;`,
  },
  {
    drop: 'DROP TABLE IF EXISTS online_course_admin;',
    create: `CREATE TABLE online_course_admin (
      id int NOT NULL AUTO_INCREMENT ,
      admin_employee_no int NOT NULL ,
      account varchar(50)  NOT NULL ,
      password varchar(16) NOT NULL ,
      admin_phone varchar(11) NOT NULL ,
      gmt_create_time varchar(20) NOT NULL ,
      admin_status int NULL DEFAULT 200 ,
      admin_info varchar(500) NULL ,
      extra_info varchar(300) NOT NULL DEFAULT '{}',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB;`,
  },
  {
    drop: 'DROP TABLE IF EXISTS online_course_course;',
    create: `CREATE TABLE online_course_course (
      id int NOT NULL AUTO_INCREMENT ,
      subject_id varchar(100) NULL ,
      uploader_id varchar(100) NOT NULL ,
      name varchar(50) NOT NULL ,
      description varchar(500) NOT NULL ,
      resource_url varchar(300) NOT NULL ，
      tags varchar(11) NULL ,
      gmt_create_time varchar(20) NOT NULL ,
      status int NULL DEFAULT 200 ,
      extra_info varchar(300) NOT NULL DEFAULT '{}' ,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB;`,
  },
  {
    drop: 'DROP TABLE IF EXISTS online_course_subject;',
    create: `CREATE TABLE online_course_subject (
      id int NOT NULL AUTO_INCREMENT ,
      name varchar(100) NULL ,
      upload_id varchar(100) NOT NULL ,
      status int DEFAULT 200 NULL ,
      gmt_create_time varchar(20) NOT NULL ,
      extra_info varchar(300) NOT NULL DEFAULT '{}' ,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB;`,
  },
  {
    drop: 'DROP TABLE IF EXISTS online_course_order;',
    create: `CREATE TABLE online_course_order (
      id int NOT NULL AUTO_INCREMENT ,
      amount int NOT NULL ,
      eraner_id varchar(100) NOT NULL ,
      cosumer_id varchar(100) NOT NULL ,
      course_id varchar(100) NOT NULL ,
      timestamp_create_time int NOT NULL ,
      gmt_create_time varchar(20) NOT NULL ,
      status int NULL DEFAULT 200 ,
      progress int NULL DEFAULT 100 ,
      extra_info varchar(300) NOT NULL DEFAULT '{}' ,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB;`,
  },
  {
    drop: 'DROP TABLE IF EXISTS online_course_comment;',
    create: `CREATE TABLE online_course_comment (
      id int NOT NULL AUTO_INCREMENT ,
      amount int NOT NULL ,
      owner_id varchar(100) NOT NULL ,
      commenter_id varchar(100) NOT NULL ,
      course_id varchar(100) NOT NULL ,
      content varchar(500) NOT NULL ,
      gmt_create_time varchar(20) NOT NULL ,
      status int DEFAULT 200 NULL ,
      star_level int NULL DEFAULT 5  ,
      extra_info varchar(300) NOT NULL DEFAULT '{}' ,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB;`,
  }
];