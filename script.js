async function getSteamProfile() {
    const steamId = document.getElementById('steamIdInput').value;
    const apiKey = 'YOUR_STEAM_API_KEY'; // Replace with your Steam API key
    const profileContainer = document.getElementById('profileContainer');
    profileContainer.innerHTML = '';

    try {
        const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`);
        const data = await response.json();
        const profile = data.response.players[0];

        if (profile) {
            const profileHtml = `
                <div class="profile-item"><strong>Nickname:</strong> ${profile.personaname}</div>
                <div class="profile-item"><strong>Real Name:</strong> ${profile.realname || 'N/A'}</div>
                <div class="profile-item"><strong>Location:</strong> ${profile.loccountrycode || 'N/A'}</div>
                <div class="profile-item"><strong>Profile URL:</strong> <a href="${profile.profileurl}" target="_blank">${profile.profileurl}</div>
                <div class="profile-item"><strong>Avatar:</strong> <img src="${profile.avatarfull}" alt="Avatar"></div>
            `;
            profileContainer.innerHTML = profileHtml;
        } else {
            profileContainer.innerHTML = 'Profile not found.';
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        profileContainer.innerHTML = 'An error occurred while fetching the profile.';
    }
}
