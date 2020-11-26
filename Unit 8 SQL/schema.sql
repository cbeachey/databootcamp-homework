CREATE TABLE employees (
	emp_no int PRIMARY KEY,
	emp_title VARCHAR(255),
	birth_date VARCHAR(255),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	sex VARCHAR(255),
	hire_date VARCHAR(255)
);

--SELECT * from department_employees

CREATE TABLE dept_manager (
	dept_no VARCHAR(255),
	emp_no INT
);

CREATE TABLE departments (
	dept_no VARCHAR(255),
	dept_name VARCHAR(255)
);

CREATE TABLE department_employees (
	emp_no INT,
	dept_no VARCHAR(255)
);

CREATE TABLE salaries (
	emp_no INT,
	salary INT
);

CREATE TABLE titles (
	title_id VARCHAR(255),
	title VARCHAR (255)
)

