import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Ensure user exists before making a request
  const { refetch, data: isAdmin, isLoading: isAdminLoading, error } = useQuery(
    {
      queryKey: [user?.email, 'isAdmin'],
      queryFn: async () => {
        if (!user?.email) {
          throw new Error("User email is not available");
        }
        try {
          const res = await axiosSecure.get(`users/admin/${user.email}`);
          console.log("Admin status response:", res.data);
          return res.data?.admin;
        } catch (err) {
          console.error("Error fetching admin status:", err);
          throw err; // Ensure errors are propagated
        }
      },
      enabled: !!user?.email, // Only run the query if the email is available
    }
  );

  return [isAdmin, isAdminLoading, error];
};

export default useAdmin;
