using DAL;
using DAL.Entities;

namespace Interfaces
{
    public interface ICurrentUser
    {
        DAL.Entities.Login GetCurrent();

        bool IsSystemAdministrator();

        //bool IsCompanyAdministrator(int companyId);

        //bool IsCarWashAdministrator(int carWashId);

        bool IsNotAuth();
        Login GetAuthUsr();

        void SetCurrent(DAL.Entities.Login login);
    }


}
