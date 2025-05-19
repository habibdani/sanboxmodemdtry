require('super-cheat/chrono-unloader');
require('super-cheat/chrono-pusher');
require('super-cheat/next-wave');

Events.on(ClientLoadEvent, () => {
    // Pastikan blok sandbox bisa terlihat
    [
        Blocks.payloadSource,
        Blocks.itemSource,
        Blocks.powerSource,
        Blocks.payloadVoid,
        Blocks.itemVoid,
        Blocks.powerVoid,
        Blocks.liquidSource,
        Blocks.liquidVoid,
        Blocks.heatSource
    ].forEach(block => {
        if (block != null) {
            block.buildVisibility = BuildVisibility.shown;
            block.unlocked = true;
            block.alwaysUnlocked = true;
        }
    });

    // Tunda modifikasi untuk memastikan semua konten termuat
    Time.run(10, () => {
        Vars.content.blocks().each(block => {
            if (block != null && block != Blocks.air) {
                block.unlocked = true;
                block.alwaysUnlocked = true;
                block.buildVisibility = BuildVisibility.shown;
            }
        });

        if (Vars.content.techTree != null) {
            Vars.content.techTree.each(node => {
                if (node != null && node.content != null) {
                    node.content.unlocked = true;
                    node.content.alwaysUnlocked = true;
                }
            });
        }

        // Tambahkan ability setelah semua unit tersedia
        const units = [UnitTypes.alpha, UnitTypes.beta, UnitTypes.gamma];
        const ability = UnitTypes.renale?.abilities?.get(0);

        if (ability != null) {
            units.forEach(unit => {
                unit.abilities.add(ability.copy());
            });

            UnitTypes.alpha.abilities.get(0).percentAmount = 0.0417 * 1000;
            UnitTypes.beta.abilities.get(0).percentAmount = 0.0556 * 1000;
            UnitTypes.gamma.abilities.get(0).percentAmount = 0.0834 * 1000;
        } else {
            print("[Mod] Ability dari renale tidak ditemukan.");
        }

        Vars.ui.showInfoToast("Semua blok telah dibuka!", 5);
    });
});
