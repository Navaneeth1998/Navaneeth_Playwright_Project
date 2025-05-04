export function generateRandomUser() {
    const rand = Math.floor(Math.random() * 100000);
    return {
      email: `sdet_test_user_${rand}@mailinator.com`,
      password: `Test1234!`,
      firstName: 'SDET',
      lastName: `Tester${rand}`
    };
  }

    