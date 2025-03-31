
using Microsoft.AspNetCore.StaticFiles;

namespace Application.Shared;

public class GetFileType
{
    public static string? GetType(string path) {
        var fileProvider = new FileExtensionContentTypeProvider();
        if(fileProvider.TryGetContentType(path, out string? t)) {
            return t;
        } else {
            return null;
        }
    }
}
