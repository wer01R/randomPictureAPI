using System;

namespace Domain;

public class Picture
{
    public string Id {get; set;} = Guid.NewGuid().ToString();
    public required string FilePath {get; set;}
    public string? Type {get; set;}
}
