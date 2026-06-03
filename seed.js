import bcryptjs from 'bcryptjs';
import prisma from './src/prisma.js';

async function main() {
  try {
    // Check if test employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { username: 'testuser' },
    });

    if (existingEmployee) {
      console.log('✅ Test employee already exists');
      console.log('Username: testuser');
      console.log('Password: password123');
    } else {
      // Create a test employee
      const hashedPassword = await bcryptjs.hash('password123', 10);
      
      const employee = await prisma.employee.create({
        data: {
          username: 'testuser',
          password: hashedPassword,
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          employeeId: 'EMP001',
          employmentType: 'Full-time',
          jobTitle: 'Software Engineer',
          position: 'Developer',
          workLocation: 'Remote',
          role: 'EMPLOYEE',
          isActive: true,
        },
      });
      
      console.log('✅ Test employee created:', employee);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();

