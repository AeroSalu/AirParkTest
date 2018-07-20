using AirParkUserAccTest.Models;

namespace AirParkUserAccTest.Repositories
{
    public class UserRepository : GenericRepository<User>, IUser
    {
        public UserRepository()
        {
            entityCollection = UsersList.Users;
        }
    }
}