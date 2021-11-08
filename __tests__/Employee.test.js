const Employee = require('../lib/Employee.js');
test('creates a employee object', () => {
    const employee = new Employee('squid');
  
    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
    expect(employee.role).toBe('Employee');
  
  });