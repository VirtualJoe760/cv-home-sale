import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/UserModel';
import bcrypt from 'bcrypt';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Credentials not provided');
        }

        await dbConnect();

        // Find the user in the database
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with this email');
        }

        // Check the password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        // Return the user object along with the role
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role, // Include the user's role here
        };
      },
    }),
  ],
  // Rest of your NextAuth options...
};

// Default export for NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
