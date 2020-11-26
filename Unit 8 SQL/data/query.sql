-- 1. List the following details of each employee: employee number, last name, first name, sex, and salary.

SELECT 
    employees.emp_no AS "Employee Number", 
    employees.last_name AS "Last Name", 
    employees.first_name AS "First Name", 
    employees.sex AS "Sex", 
    salaries.salary AS "Salary"
FROM employees
LEFT JOIN salaries
ON(employees.emp_no=salaries.emp_no)

-- 2. List first name, last name, and hire date for employees who were hired in 1986.

SELECT first_name, last_name, hire_date
FROM employees
WHERE hire_date LIKE '%1986';

 
-- 3. List the manager of each department with the following information: department number, department name, 
--    the manager's employee number, last name, first name.

SELECT 
	departments.dept_name AS "Dept Name",
	dept_manager.dept_no AS "Dept Number",
	employees.emp_no AS "Emp Number",
	employees.first_name AS "First Name",
	employees.last_name AS "Last Name"
FROM departments
join dept_manager 
on dept_manager.dept_no = departments.dept_no 
JOIN employees
ON employees.emp_no = dept_manager.emp_no

-- 4. List the department of each employee with the following information: employee number, last name, 
--    first name, and department name.

SELECT 
	departments.dept_name AS "Dept Name",
	employees.emp_no AS "Employee Number",
	employees.first_name AS "First Name",
	employees.last_name AS "Last Name"
FROM departments
JOIN department_employees
ON department_employees.dept_no = departments.dept_no
JOIN employees
ON employees.emp_no = department_employees.emp_no

-- 5. List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."

SELECT first_name, last_name, sex FROM employees
WHERE first_name = 'Hercules'
AND last_name LIKE 'B%';


-- 6. List all employees in the Sales department, including their employee number, last name, 
--    first name, and department name.


-- 7. List all employees in the Sales and Development departments, including their employee number, 
--    last name, first name, and department name.


-- 8. In descending order, list the frequency count of employee last names, i.e., 
--    how many employees share each last name.