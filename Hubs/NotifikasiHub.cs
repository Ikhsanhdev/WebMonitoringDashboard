using Microsoft.AspNetCore.SignalR;
namespace menyala.Hubs;
using System.Threading.Tasks;

public class NotificationHub : Hub
{
    public async Task SendNotification(string message)
    {
        await Clients.All.SendAsync("ReceiveNotification", message);
    }
    public async Task SendUpdateToClient(string tiketId, string status)
    {
        await Clients.All.SendAsync("UpdateTicketQueue", tiketId, status);
    }

}
