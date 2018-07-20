using System.Linq;
using System.Threading.Tasks;

namespace AirParkUserAccTest.Repositories
{
    public interface IGeneric<T>
    {
        T Get(int Id);

        IQueryable<T> GetAll();

        T Add(T entity);

        T Update(T entity);

        bool Delete(int Id);
    }
}
